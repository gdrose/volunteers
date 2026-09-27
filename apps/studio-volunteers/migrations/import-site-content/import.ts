/**
 * Step 2 of the content import: turn `content.json` (see extract.ts) into Sanity
 * documents in every locale, uploading images along the way. Safe to re-run: documents
 * are matched by slug + language (or fixed singleton id) and replaced in place.
 *
 *   bunx sanity exec migrations/import-site-content/import.ts --with-user-token
 */
import {randomUUID} from 'node:crypto'
import {createReadStream, readFileSync} from 'node:fs'
import {basename, dirname, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'
type SanityDocumentStub = {_type: string} & Record<string, unknown>
import {getCliClient} from 'sanity/cli'
import {API_VERSION, BASE_LOCALE, LOCALES} from '../../locales'

type Message = {$m: string} | string
type Img = {$img: string}
type Content = Record<string, any>

const client = getCliClient({apiVersion: API_VERSION})
const here = dirname(fileURLToPath(import.meta.url))
const content: Content = JSON.parse(readFileSync(resolve(here, 'content.json'), 'utf8'))
const messages: Record<string, Record<string, string>> = Object.fromEntries(
  LOCALES.map(({id}) => [
    id,
    JSON.parse(readFileSync(resolve(here, `../../../web/messages/${id}.json`), 'utf8')),
  ]),
)

const key = () => randomUUID().replace(/-/g, '').slice(0, 12)

function t(message: Message | undefined, locale: string): string | undefined {
  if (message === undefined || typeof message === 'string') return message
  const text = messages[locale][message.$m] ?? messages[BASE_LOCALE][message.$m]
  if (text === undefined) throw new Error(`Missing message ${message.$m}`)
  return text
}

// --- Images -----------------------------------------------------------------------

const uploads = new Map<string, Promise<string>>()

function uploadImage(path: string) {
  if (!uploads.has(path)) {
    uploads.set(
      path,
      client.assets
        .upload('image', createReadStream(path), {filename: basename(path)})
        .then((asset) => asset._id),
    )
  }
  return uploads.get(path)!
}

const positions: Record<string, number> = {left: 0, top: 0, center: 0.5, right: 1, bottom: 1}
const axis = (value: string) =>
  value.endsWith('%') ? Number.parseFloat(value) / 100 : positions[value]

/** Translate the site's `object-[x_y]` / `object-left-top` crop classes into a hotspot. */
function hotspotFrom(classes?: string) {
  if (!classes) return undefined
  const bracket = classes.match(/object-\[([^_\]]+)_([^\]]+)\]/)
  let x = 0.5
  let y = 0.5
  if (bracket) {
    x = axis(bracket[1]) ?? x
    y = axis(bracket[2]) ?? y
  } else {
    const named = classes.match(
      /object-((?:left|right|center|top|bottom)(?:-(?:left|right|top|bottom))?)/,
    )
    if (!named) return undefined
    for (const part of named[1].split('-')) {
      if (part === 'left' || part === 'right') x = positions[part]
      if (part === 'top' || part === 'bottom') y = positions[part]
    }
  }
  const size = 0.2
  const clamp = (v: number) => Math.min(Math.max(v, size / 2), 1 - size / 2)
  return {_type: 'sanity.imageHotspot', x: clamp(x), y: clamp(y), width: size, height: size}
}

async function image(src: Img | undefined, alt: string | undefined, position?: string) {
  if (!src) return undefined
  const hotspot = hotspotFrom(position)
  return {
    _type: 'imageWithAlt',
    asset: {_type: 'reference', _ref: await uploadImage(src.$img)},
    alt,
    ...(hotspot && {
      hotspot,
      crop: {_type: 'sanity.imageCrop', top: 0, bottom: 0, left: 0, right: 0},
    }),
  }
}

// --- Portable Text ------------------------------------------------------------------

const block = (text: string, style = 'normal') => ({
  _type: 'block',
  _key: key(),
  style,
  markDefs: [],
  children: [{_type: 'span', _key: key(), text, marks: []}],
})

function articleBody(body: any[], locale: string) {
  return body.map((item) => {
    if (item.type === 'heading') return block(t(item.text, locale)!, 'h2')
    if (item.type === 'quote') {
      return {
        _type: 'pullQuote',
        _key: key(),
        text: t(item.text, locale),
        attribution: t(item.cite, locale),
      }
    }
    return block(t(item.text, locale)!)
  })
}

// --- Writes -------------------------------------------------------------------------

/** Replace the document matched by `query`, or create it with a generated id. */
async function upsert(doc: SanityDocumentStub, query: string, params: Record<string, unknown>) {
  const existing = await client.fetch<string | null>(`${query}[0]._id`, params)
  if (existing) {
    await client.createOrReplace({...doc, _id: existing})
    return existing
  }
  return (await client.create(doc))._id
}

async function upsertTranslated(
  type: string,
  slug: string,
  doc: (locale: string) => Promise<object>,
) {
  const ids: Record<string, string> = {}
  for (const {id: locale} of LOCALES) {
    ids[locale] = await upsert(
      {_type: type, language: locale, slug: {_type: 'slug', current: slug}, ...(await doc(locale))},
      `*[_type == $type && language == $locale && slug.current == $slug && !(_id in path("drafts.**"))]`,
      {type, locale, slug},
    )
  }
  // Link the translations the way @sanity/document-internationalization does.
  await upsert(
    {
      _type: 'translation.metadata',
      schemaTypes: [type],
      translations: LOCALES.map(({id: locale}) => ({
        _key: key(),
        _type: 'internationalizedArrayReferenceValue',
        language: locale,
        value: {_type: 'reference', _ref: ids[locale]},
      })),
    },
    `*[_type == "translation.metadata" && $id in translations[].value._ref]`,
    {id: ids[BASE_LOCALE]},
  )
  return ids
}

// --- Content ------------------------------------------------------------------------

async function importProjects() {
  const ids: Record<string, Record<string, string>> = {}
  for (const [index, card] of content.projects.entries()) {
    const detail = content.projectDetails.find((d: any) => d.id === card.id)
    const photos: any[] = content.projectPhotos[card.id] ?? []
    ids[card.id] = await upsertTranslated('project', card.id, async (locale) => ({
      title: t(card.title, locale),
      sortOrder: (index + 1) * 10,
      teaser: t(card.description, locale),
      headline: t(detail.titleStart, locale),
      headlineEmphasis: t(detail.titleHighlight, locale),
      summary: t(detail.summary, locale),
      intro: t(detail.intro, locale),
      body: detail.paragraphs.map((p: Message) => block(t(p, locale)!)),
      partners: detail.partners.map((p: {name: string}) => p.name),
      coverImage: await image(card.image, t(card.title, locale), card.imageClass),
      heroImage: await image(
        detail.header.src,
        t(detail.header.alt, locale),
        detail.header.position,
      ),
      showcasePhotos: await Promise.all(
        photos.map(async (p) => ({
          _key: key(),
          ...(await image(p.src, t(p.alt, locale), p.position)),
        })),
      ),
      gallery: await Promise.all(
        detail.gallery.map(async (p: any) => ({
          _key: key(),
          ...(await image(p.src, t(p.alt, locale), p.position)),
        })),
      ),
      activities: detail.activities.map((a: any) => ({
        _key: key(),
        _type: 'activity',
        label: t(a.label, locale),
        icon: basename(a.icon.$img, '.svg'),
      })),
      resources: await Promise.all(
        detail.resources.map(async (r: any) => ({
          _key: key(),
          _type: 'resource',
          kind: r.kind,
          title: t(r.title, locale),
          description: t(r.description, locale),
          shortDescription: t(r.shortDescription, locale),
          cover: await image(r.cover, t(r.title, locale)),
        })),
      ),
    }))
    console.log(`project ${card.id}`)
  }
  return ids
}

async function importNews(projectIds: Record<string, Record<string, string>>) {
  const ids: Record<string, Record<string, string>> = {}
  for (const post of [content.featuredPost, ...content.newsPosts]) {
    ids[post.slug] = await upsertTranslated('newsPost', post.slug, async (locale) => ({
      title: t(post.title, locale),
      excerpt: t(post.excerpt, locale),
      publishedAt: post.date,
      category: post.category,
      project: post.project
        ? {_type: 'reference', _ref: projectIds[post.project][locale]}
        : undefined,
      coverImage: await image(post.image, t(post.title, locale)),
      body: articleBody(post.body, locale),
    }))
    console.log(`newsPost ${post.slug}`)
  }
  return ids
}

async function importGroups() {
  for (const group of content.groups) {
    const whatsapp = group.whatsapp?.startsWith('http') ? group.whatsapp : undefined
    await upsert(
      {
        _type: 'group',
        city: group.city,
        slug: {_type: 'slug', current: group.id},
        kind: group.kind,
        country: group.country,
        region: group.region,
        location: {_type: 'geopoint', lat: group.lat, lng: group.lng},
        description: group.description
          ? LOCALES.map(({id: locale}) => ({
              _key: key(),
              _type: 'internationalizedArrayTextValue',
              language: locale,
              value: t(group.description, locale),
            }))
          : undefined,
        email: group.email,
        whatsappUrl: whatsapp,
        featured: Boolean(group.featured),
        photo: group.featured ? await image(group.featured.image, group.city) : undefined,
        volunteerCount: group.featured?.volunteers,
        projectCount: group.featured?.projects,
      },
      `*[_type == "group" && slug.current == $slug && !(_id in path("drafts.**"))]`,
      {slug: group.id},
    )
    console.log(`group ${group.id}`)
  }
}

async function importSingletons(newsIds: Record<string, Record<string, string>>) {
  for (const {id: locale} of LOCALES) {
    await client.createOrReplace({
      _id: `homePage-${locale}`,
      _type: 'homePage',
      language: locale,
      stats: content.stats.map((s: any) => ({
        _key: key(),
        _type: 'stat',
        value: s.value,
        label: t(s.label, locale),
        description: t(s.description, locale),
      })),
    })
    await client.createOrReplace({
      _id: `newsPage-${locale}`,
      _type: 'newsPage',
      language: locale,
      featuredPost: {_type: 'reference', _ref: newsIds[content.featuredPost.slug][locale]},
    })
    await client.createOrReplace({
      _id: `aboutPage-${locale}`,
      _type: 'aboutPage',
      language: locale,
      milestones: await Promise.all(
        content.milestones.map(async (m: any) => ({
          _key: key(),
          _type: 'milestone',
          period: t(m.year, locale),
          title: t(m.title, locale),
          description: t(m.description, locale),
          image: await image(m.image, t(m.title, locale), m.imagePosition),
        })),
      ),
      offices: content.offices.map((o: any) => ({
        _key: key(),
        _type: 'office',
        scope: o.id,
        title: t(o.title, locale),
        description: t(o.description, locale),
        location: t(o.location, locale),
        email: o.email,
      })),
      // Foundation documents need their PDF uploaded; the site's file isn't published yet.
    })
    console.log(`singletons ${locale}`)
  }
  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    socials: content.socials.map((s: any) => ({
      _key: key(),
      _type: 'socialProfile',
      platform: s.id,
      url: s.url,
    })),
  })
}

async function main() {
  const projectIds = await importProjects()
  const newsIds = await importNews(projectIds)
  await importGroups()
  await importSingletons(newsIds)
  console.log(`Done. Uploaded ${uploads.size} images.`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})

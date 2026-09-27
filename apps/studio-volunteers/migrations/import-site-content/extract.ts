// @ts-nocheck -- runs under Bun, whose types the Studio does not install

/**
 * Step 1 of the content import: load the web app's hardcoded data modules and
 * dump them to `content.json`, with Paraglide messages kept as `{$m: key}` and
 * imported images as `{$img: absolutePath}`. Run with Bun (it loads the TS directly):
 *
 *   bun migrations/import-site-content/extract.ts
 *
 * One-time: once the content moved to Sanity, apps/web dropped those data modules, images and
 * message keys. To re-run, check out the commit before that removal.
 */
import {plugin} from 'bun'
import {resolve} from 'node:path'

const webSrc = resolve(import.meta.dir, '../../../web/src')
const assetPattern = /\.(png|jpe?g|svg|webp|gif)$/

plugin({
  name: 'sveltekit-shim',
  setup(build) {
    // Stub Paraglide so each message resolves to its key instead of a translation.
    build.onLoad({filter: /\/lib\/paraglide\/messages\.js$/}, () => ({
      loader: 'js',
      contents: `export const m = new Proxy({}, {get: (_, key) => Object.assign(() => key, {$m: key})})`,
    }))
    build.onLoad({filter: /\/lib\/paraglide\/runtime\.js$/}, () => ({
      loader: 'js',
      contents: `export const getLocale = () => 'en'`,
    }))
    build.onResolve({filter: /^\$lib\//}, ({path}) => {
      const target = resolve(webSrc, 'lib', path.slice('$lib/'.length))
      return {path: /\/paraglide\/[a-z]+$/.test(target) ? `${target}.js` : target}
    })
    build.onLoad({filter: assetPattern}, ({path}) => ({
      loader: 'js',
      contents: `export default ${JSON.stringify({$img: path})}`,
    }))
  },
})

const lib = (path: string) => import(resolve(webSrc, 'lib/components', path))

const [news, projects, details, showcase, groups, contacts, documents, story, stats, socials] =
  await Promise.all([
    lib('news/news.ts'),
    lib('projects/projects.ts'),
    lib('projects/project-details.ts'),
    lib('projects/project-showcase.ts'),
    lib('groups/groups.ts'),
    lib('about/contacts.ts'),
    lib('about/documents.ts'),
    lib('about/story.ts'),
    lib('stats/stats.ts'),
    lib('shared/socials.ts'),
  ])

/** Message functions become `{$m}`; plain thunks like `year: () => '2022'` are evaluated. */
function serialize(value: unknown): unknown {
  if (typeof value === 'function') {
    const key = (value as {$m?: string}).$m
    return key ? {$m: key} : value()
  }
  if (Array.isArray(value)) return value.map(serialize)
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, serialize(v)]))
  }
  return value
}

const content = serialize({
  featuredPost: news.featuredPost,
  newsPosts: news.newsPosts,
  projects: projects.projects,
  projectDetails: details.projectDetails,
  projectPhotos: showcase.projectPhotos,
  groups: groups.groups,
  offices: contacts.offices,
  documents: documents.documents,
  milestones: story.milestones,
  stats: stats.stats,
  socials: socials.socials,
})

const out = resolve(import.meta.dir, 'content.json')
await Bun.write(out, JSON.stringify(content, null, 2))
console.log(`Wrote ${out}`)

import type {SlugIsUniqueValidator} from 'sanity'
import {API_VERSION} from '../../locales'

/**
 * Translations of a document share its slug (e.g. /news/x and /it/news/x), so
 * slugs only need to be unique among documents of the same type and language.
 */
export const isUniqueInLanguage: SlugIsUniqueValidator = async (slug, context) => {
  const {document, getClient} = context
  if (!document) return true

  const id = document._id.replace(/^drafts\./, '')
  const client = getClient({apiVersion: API_VERSION})
  const duplicate = await client.fetch<string | null>(
    `*[
      _type == $type &&
      slug.current == $slug &&
      language == $language &&
      !(_id in [$id, "drafts." + $id])
    ][0]._id`,
    {type: document._type, slug, language: document.language ?? null, id},
  )
  return !duplicate
}

/**
 * Languages the site is published in. Keep in sync with `locales` in
 * apps/web/project.inlang/settings.json — the frontend picks content by these ids.
 */
export const LOCALES = [
  {id: 'en', title: 'English'},
  {id: 'it', title: 'Italiano'},
  {id: 'es', title: 'Español'},
  {id: 'nl', title: 'Nederlands'},
  {id: 'ja', title: '日本語'},
]

export const BASE_LOCALE = 'en'

export const API_VERSION = '2026-09-27'

/** Document types translated as one document per language (@sanity/document-internationalization). */
export const TRANSLATED_TYPES = ['newsPost', 'project']

/** Singletons with one fixed-id document per language: `${type}-${locale}`. */
export const LOCALIZED_SINGLETONS = ['homePage', 'newsPage', 'aboutPage']

/** Singletons shared across languages, stored under their type name as the id. */
export const SINGLETONS = ['siteSettings']

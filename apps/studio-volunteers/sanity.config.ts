import {documentInternationalization} from '@sanity/document-internationalization'
import {visionTool} from '@sanity/vision'
import {defineConfig, type Template} from 'sanity'
import {internationalizedArray} from 'sanity-plugin-internationalized-array'
import {structureTool} from 'sanity/structure'
import {
  API_VERSION,
  BASE_LOCALE,
  LOCALES,
  LOCALIZED_SINGLETONS,
  SINGLETONS,
  TRANSLATED_TYPES,
} from './locales'
import {schemaTypes} from './schemaTypes'
import {structure} from './deskStructure'

const singletonTypes = new Set([...SINGLETONS, ...LOCALIZED_SINGLETONS])

export default defineConfig({
  name: 'default',
  title: 'Volunteers',

  projectId: 'hkjo1dgo',
  dataset: 'production',

  plugins: [
    structureTool({structure}),
    // News posts and projects: one document per language, linked as translations.
    documentInternationalization({
      supportedLanguages: LOCALES,
      schemaTypes: TRANSLATED_TYPES,
      apiVersion: API_VERSION,
    }),
    // Groups are shared across languages; only their short texts are translated per field.
    internationalizedArray({
      languages: LOCALES,
      defaultLanguages: [BASE_LOCALE],
      fieldTypes: ['text'],
      apiVersion: API_VERSION,
    }),
    visionTool({defaultApiVersion: API_VERSION}),
  ],

  schema: {
    types: schemaTypes,
    // Pre-set `language` on each localized singleton (`homePage-it`, …).
    templates: (prev): Template[] => [
      ...prev,
      ...LOCALIZED_SINGLETONS.flatMap((schemaType) =>
        LOCALES.map((locale) => ({
          id: `${schemaType}-${locale.id}`,
          title: `${schemaType} (${locale.id})`,
          schemaType,
          value: {language: locale.id},
        })),
      ),
    ],
  },

  document: {
    // Only offer templates that set a language; singletons are opened from the sidebar.
    newDocumentOptions: (prev) =>
      prev.filter((item) => {
        const template = item.templateId
        if (TRANSLATED_TYPES.includes(template)) return false
        if (template.endsWith('-parameterized')) return false
        return ![...singletonTypes].some(
          (type) => template === type || template.startsWith(`${type}-`),
        )
      }),
    // Singletons can't be duplicated or deleted.
    actions: (prev, {schemaType}) =>
      singletonTypes.has(schemaType)
        ? prev.filter(({action}) => action !== 'duplicate' && action !== 'delete')
        : prev,
  },
})

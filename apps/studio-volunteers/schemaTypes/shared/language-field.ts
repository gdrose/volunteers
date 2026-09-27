import {defineField} from 'sanity'

/** Set by the translation UI or the per-language templates; never edited by hand. */
export const languageField = defineField({
  name: 'language',
  type: 'string',
  readOnly: true,
  hidden: true,
})

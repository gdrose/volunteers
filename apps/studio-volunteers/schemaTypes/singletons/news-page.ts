import {DocumentsIcon} from '@sanity/icons/Documents'
import {defineField, defineType} from 'sanity'
import {languageField} from '../shared/language-field'

export const newsPage = defineType({
  name: 'newsPage',
  title: 'News page',
  type: 'document',
  icon: DocumentsIcon,
  fields: [
    languageField,
    defineField({
      name: 'featuredPost',
      type: 'reference',
      to: [{type: 'newsPost'}],
      description: 'Highlighted at the top of the News page. Defaults to the latest post.',
      options: {
        filter: ({document}) => ({
          filter: 'language == $language',
          params: {language: document.language},
        }),
      },
    }),
  ],
  preview: {
    select: {language: 'language'},
    prepare: ({language}) => ({title: 'News page', subtitle: language?.toUpperCase()}),
  },
})

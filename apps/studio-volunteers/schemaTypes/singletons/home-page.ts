import {HomeIcon} from '@sanity/icons/Home'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {languageField} from '../shared/language-field'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  icon: HomeIcon,
  fields: [
    languageField,
    defineField({
      name: 'stats',
      type: 'array',
      description: 'Key figures shown on the home page.',
      of: [
        defineArrayMember({
          name: 'stat',
          type: 'object',
          fields: [
            defineField({
              name: 'value',
              type: 'string',
              description: 'As displayed, e.g. "10000+".',
              validation: (rule) => rule.required(),
            }),
            defineField({name: 'label', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'description', type: 'text', rows: 2}),
          ],
          preview: {select: {title: 'value', subtitle: 'label'}},
        }),
      ],
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: 'statsAsOf',
      title: 'Figures as of',
      type: 'date',
      description: 'When the key figures were last checked. Shown under them as "Figures as of …".',
    }),
  ],
  preview: {
    select: {language: 'language'},
    prepare: ({language}) => ({title: 'Home page', subtitle: language?.toUpperCase()}),
  },
})

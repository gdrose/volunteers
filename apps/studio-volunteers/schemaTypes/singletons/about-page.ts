import {InfoOutlineIcon} from '@sanity/icons/InfoOutline'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {languageField} from '../shared/language-field'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About page',
  type: 'document',
  icon: InfoOutlineIcon,
  groups: [
    {name: 'story', title: 'Our story', default: true},
    {name: 'contacts', title: 'Contacts'},
    {name: 'documents', title: 'Documents'},
  ],
  fields: [
    languageField,
    defineField({
      name: 'milestones',
      type: 'array',
      group: 'story',
      description: 'Timeline, oldest first. The last milestone is shown as the present day.',
      of: [
        defineArrayMember({
          name: 'milestone',
          type: 'object',
          fields: [
            defineField({
              name: 'period',
              type: 'string',
              description: 'Year or label, e.g. "2024" or "Today".',
              validation: (rule) => rule.required(),
            }),
            defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'description', type: 'text', rows: 3}),
            defineField({name: 'image', type: 'imageWithAlt'}),
          ],
          preview: {select: {title: 'title', subtitle: 'period', media: 'image'}},
        }),
      ],
    }),
    defineField({
      name: 'offices',
      type: 'array',
      group: 'contacts',
      description: 'Groups without their own email fall back to the office for their country.',
      of: [
        defineArrayMember({
          name: 'office',
          type: 'object',
          fields: [
            defineField({
              name: 'scope',
              type: 'string',
              options: {
                list: [
                  {title: 'Italy', value: 'italy'},
                  {title: 'International', value: 'international'},
                ],
                layout: 'radio',
                direction: 'horizontal',
              },
              validation: (rule) => rule.required(),
            }),
            defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'description', type: 'text', rows: 2}),
            defineField({name: 'location', type: 'string'}),
            defineField({
              name: 'email',
              type: 'string',
              validation: (rule) => rule.required().email(),
            }),
          ],
          preview: {select: {title: 'title', subtitle: 'email'}},
        }),
      ],
    }),
    defineField({
      name: 'documents',
      type: 'array',
      group: 'documents',
      description: 'Official foundation documents, such as the statute.',
      of: [
        defineArrayMember({
          name: 'foundationDocument',
          type: 'object',
          fields: [
            defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
            defineField({
              name: 'file',
              type: 'file',
              options: {accept: 'application/pdf'},
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'updatedYear',
              title: 'Last updated (year)',
              type: 'number',
              validation: (rule) => rule.integer().min(2000),
            }),
          ],
          preview: {select: {title: 'title', subtitle: 'updatedYear'}},
        }),
      ],
    }),
  ],
  preview: {
    select: {language: 'language'},
    prepare: ({language}) => ({title: 'About page', subtitle: language?.toUpperCase()}),
  },
})

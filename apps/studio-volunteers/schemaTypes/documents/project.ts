import {RocketIcon} from '@sanity/icons/Rocket'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {isUniqueInLanguage} from '../shared/is-unique-in-language'
import {languageField} from '../shared/language-field'

/** Icons the site ships for activities; values match the SVG names in apps/web. */
const ACTIVITY_ICONS = [
  'book-open',
  'calendar',
  'droplet',
  'globe',
  'graduation-cap',
  'heart-handshake',
  'hospital',
  'languages',
  'leaf',
  'megaphone',
  'puzzle',
  'recycle',
  'siren',
  'stethoscope',
  'tent',
  'users',
]

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: RocketIcon,
  groups: [
    {name: 'overview', title: 'Overview', default: true},
    {name: 'media', title: 'Photos'},
    {name: 'details', title: 'Activities & resources'},
    {name: 'impact', title: 'Impact'},
  ],
  fields: [
    languageField,
    defineField({
      name: 'title',
      type: 'string',
      group: 'overview',
      description: 'Short name, used on cards and in breadcrumbs.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      group: 'overview',
      description: 'Keep the same slug on every translation of this project.',
      options: {source: 'title', isUnique: isUniqueInLanguage},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sortOrder',
      type: 'number',
      group: 'overview',
      description: 'Projects are listed from lowest to highest.',
      validation: (rule) => rule.integer(),
    }),
    defineField({
      name: 'teaser',
      type: 'text',
      rows: 3,
      group: 'overview',
      description: 'Shown on the project card on the home page.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'headline',
      type: 'string',
      group: 'overview',
      description: 'Title at the top of the project page.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'headlineEmphasis',
      type: 'string',
      group: 'overview',
      description: 'Words that follow the headline and are emphasised, e.g. "for the city".',
    }),
    defineField({
      name: 'summary',
      type: 'text',
      rows: 3,
      group: 'overview',
      description: 'Shown under the headline on the project page.',
    }),
    defineField({name: 'intro', type: 'text', rows: 3, group: 'overview'}),
    defineField({name: 'body', type: 'simpleText', group: 'overview'}),
    defineField({
      name: 'partners',
      type: 'array',
      group: 'overview',
      of: [defineArrayMember({type: 'string'})],
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: 'coverImage',
      type: 'imageWithAlt',
      group: 'media',
      description: 'Used on the project card.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroImage',
      type: 'imageWithAlt',
      group: 'media',
      description: 'Header photo on the project page.',
    }),
    defineField({
      name: 'showcasePhotos',
      type: 'array',
      group: 'media',
      description: 'Mosaic on the What we do page. The first photo is the lead shot.',
      of: [defineArrayMember({type: 'imageWithAlt'})],
      options: {layout: 'grid'},
      validation: (rule) => rule.max(3),
    }),
    defineField({
      name: 'gallery',
      type: 'array',
      group: 'media',
      of: [defineArrayMember({type: 'imageWithAlt'})],
      options: {layout: 'grid'},
    }),
    defineField({
      name: 'activities',
      type: 'array',
      group: 'details',
      of: [
        defineArrayMember({
          name: 'activity',
          type: 'object',
          fields: [
            defineField({name: 'label', type: 'string', validation: (rule) => rule.required()}),
            defineField({
              name: 'icon',
              type: 'string',
              options: {list: ACTIVITY_ICONS},
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {select: {title: 'label', subtitle: 'icon'}},
        }),
      ],
    }),
    defineField({
      name: 'resources',
      type: 'array',
      group: 'details',
      of: [
        defineArrayMember({
          name: 'resource',
          type: 'object',
          fields: [
            defineField({
              name: 'kind',
              type: 'string',
              options: {
                list: [
                  {title: 'Book', value: 'book'},
                  {title: 'Document', value: 'document'},
                  {title: 'Video', value: 'video'},
                ],
                layout: 'radio',
                direction: 'horizontal',
              },
              validation: (rule) => rule.required(),
            }),
            defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'description', type: 'text', rows: 3}),
            defineField({
              name: 'shortDescription',
              type: 'string',
              description: 'Short copy shown on the resource card. Falls back to the description.',
            }),
            defineField({name: 'cover', type: 'imageWithAlt'}),
            defineField({
              name: 'file',
              type: 'file',
              description: 'Upload a PDF, or link to it below. Host videos on YouTube or Vimeo.',
            }),
            defineField({name: 'url', title: 'Link', type: 'url'}),
          ],
          preview: {
            select: {title: 'title', subtitle: 'kind', media: 'cover'},
          },
        }),
      ],
    }),
    defineField({
      name: 'startedYear',
      title: 'Started (year)',
      type: 'number',
      group: 'impact',
      validation: (rule) => rule.integer().min(1900),
    }),
    defineField({
      name: 'impact',
      type: 'array',
      group: 'impact',
      description: 'Key results, e.g. "1200+" "meals served". Shown after the activities.',
      of: [
        defineArrayMember({
          name: 'impactFigure',
          type: 'object',
          fields: [
            defineField({
              name: 'value',
              type: 'string',
              description: 'As displayed, e.g. "1200+".',
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
      name: 'outcomes',
      type: 'simpleText',
      group: 'impact',
      description: 'Optional. What changed thanks to the project, in a few sentences.',
    }),
  ],
  orderings: [
    {title: 'Site order', name: 'sortOrderAsc', by: [{field: 'sortOrder', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'title', language: 'language', media: 'coverImage'},
    prepare: ({title, language, media}) => ({title, subtitle: language?.toUpperCase(), media}),
  },
})

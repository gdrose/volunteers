import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {defineField, defineType} from 'sanity'
import {isUniqueInLanguage} from '../shared/is-unique-in-language'
import {languageField} from '../shared/language-field'

/** Labels are translated on the site; values are the ids it filters by. */
export const NEWS_CATEGORIES = [
  {title: 'Field stories', value: 'field-stories'},
  {title: 'New locations', value: 'new-locations'},
  {title: 'Medical', value: 'medical'},
  {title: 'Culture', value: 'culture'},
]

export const newsPost = defineType({
  name: 'newsPost',
  title: 'News post',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    languageField,
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'slug',
      type: 'slug',
      description: 'Keep the same slug on every translation of this post.',
      options: {source: 'title', isUnique: isUniqueInLanguage},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
      rows: 3,
      description: 'Shown under the title, on cards and as the page description.',
      validation: (rule) => [
        rule.required(),
        rule.max(220).warning('Keep it short so it fits on cards and in search results.'),
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date',
      type: 'date',
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      type: 'string',
      options: {list: NEWS_CATEGORIES, layout: 'radio'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'project',
      type: 'reference',
      to: [{type: 'project'}],
      description: 'Optional. The post is also listed on this project’s page.',
      options: {
        filter: ({document}) => ({
          filter: 'language == $language',
          params: {language: document.language},
        }),
      },
    }),
    defineField({
      name: 'coverImage',
      type: 'imageWithAlt',
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'body', type: 'articleBody', validation: (rule) => rule.required()}),
  ],
  orderings: [
    {
      title: 'Newest first',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {title: 'title', date: 'publishedAt', language: 'language', media: 'coverImage'},
    prepare: ({title, date, language, media}) => ({
      title,
      subtitle: [language?.toUpperCase(), date].filter(Boolean).join(' · '),
      media,
    }),
  },
})

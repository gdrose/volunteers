import {SearchIcon} from '@sanity/icons/Search'
import {defineField, defineType} from 'sanity'

/**
 * How a page appears in search results and when shared. Every field is optional:
 * the site falls back to the page's own title, description and main image.
 */
export const seo = defineType({
  name: 'seo',
  title: 'Search & sharing',
  type: 'object',
  icon: SearchIcon,
  options: {collapsible: true, collapsed: true},
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Search title',
      type: 'string',
      description:
        'Replaces the page title in search results and link previews. The site name is added after it.',
      validation: (rule) =>
        rule
          .max(50)
          .warning('Search results cut titles at about 60 characters, site name included.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Search description',
      type: 'text',
      rows: 3,
      description: 'The snippet under the title in search results. Put the key fact first.',
      validation: (rule) =>
        rule.max(155).warning('Search results cut descriptions at about 155 characters.'),
    }),
    defineField({
      name: 'shareImage',
      type: 'imageWithAlt',
      description:
        'Shown when the page is shared on social media or in chats. Cropped to 1200×630.',
    }),
    defineField({
      name: 'noindex',
      title: 'Hide from search engines',
      type: 'boolean',
      description: 'The page stays on the site but is left out of search results and the sitemap.',
      initialValue: false,
    }),
  ],
})

import {BlockquoteIcon} from '@sanity/icons/Blockquote'
import {defineField, defineType} from 'sanity'

export const pullQuote = defineType({
  name: 'pullQuote',
  title: 'Quote',
  type: 'object',
  icon: BlockquoteIcon,
  fields: [
    defineField({name: 'text', type: 'text', rows: 3, validation: (rule) => rule.required()}),
    defineField({
      name: 'attribution',
      type: 'string',
      description: 'Who said it, e.g. "Giulia, volunteer in Catania".',
    }),
  ],
  preview: {
    select: {title: 'text', subtitle: 'attribution'},
  },
})

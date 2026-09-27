import {defineArrayMember, defineField, defineType} from 'sanity'

const linkAnnotation = defineArrayMember({
  name: 'link',
  type: 'object',
  title: 'Link',
  fields: [
    defineField({
      name: 'href',
      type: 'url',
      validation: (rule) => rule.required().uri({scheme: ['http', 'https', 'mailto', 'tel']}),
    }),
  ],
})

/** Article body: paragraphs, section headings, lists, links and pull quotes. */
export const articleBody = defineType({
  name: 'articleBody',
  title: 'Body',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Paragraph', value: 'normal'},
        {title: 'Heading', value: 'h2'},
      ],
      marks: {annotations: [linkAnnotation]},
    }),
    defineArrayMember({type: 'pullQuote'}),
  ],
})

/** Plain paragraphs with links, for short descriptive copy. */
export const simpleText = defineType({
  name: 'simpleText',
  title: 'Text',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [{title: 'Paragraph', value: 'normal'}],
      lists: [],
      marks: {annotations: [linkAnnotation]},
    }),
  ],
})

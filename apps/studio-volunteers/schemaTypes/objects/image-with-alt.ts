import {ImageIcon} from '@sanity/icons/Image'
import {defineField, defineType} from 'sanity'

/** An image with alt text. Set the hotspot to control how it's cropped on the site. */
export const imageWithAlt = defineType({
  name: 'imageWithAlt',
  title: 'Image',
  type: 'image',
  icon: ImageIcon,
  options: {hotspot: true},
  fields: [
    defineField({
      name: 'alt',
      title: 'Alternative text',
      type: 'string',
      description: 'Describe the photo for screen readers and search engines.',
      validation: (rule) =>
        rule.custom((alt, context) => {
          const image = context.parent as {asset?: unknown} | undefined
          return !image?.asset || alt ? true : 'Alt text is required'
        }),
    }),
  ],
})

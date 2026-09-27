import {PinIcon} from '@sanity/icons/Pin'
import {defineField, defineType} from 'sanity'

/**
 * A local volunteer group on the Find a group map. Shared across languages:
 * only the description is translated, field by field.
 */
export const group = defineType({
  name: 'group',
  title: 'Group',
  type: 'document',
  icon: PinIcon,
  fields: [
    defineField({name: 'city', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'slug',
      type: 'slug',
      description: 'Used in the Find a group link, e.g. ?group=milano.',
      options: {source: 'city'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'kind',
      type: 'string',
      options: {
        list: [
          {title: 'Local group', value: 'local'},
          {title: 'Project site', value: 'project'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'local',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'country',
      type: 'string',
      description: 'Two-letter country code, e.g. IT, NL, GB.',
      initialValue: 'IT',
      validation: (rule) =>
        rule
          .required()
          .regex(/^[A-Z]{2}$/, {name: 'ISO country code'})
          .error('Use a two-letter uppercase country code, e.g. IT.'),
    }),
    defineField({
      name: 'region',
      type: 'string',
      description: 'Italian groups only, e.g. Sicilia. Groups abroad show their country.',
      hidden: ({document}) => document?.country !== 'IT',
    }),
    defineField({
      name: 'location',
      type: 'geopoint',
      description: 'Where the pin sits on the map.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'internationalizedArrayText',
      description: 'Short introduction shown when the group is opened.',
    }),
    defineField({
      name: 'email',
      type: 'string',
      description: 'Leave empty to use the Italian or international office address.',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'whatsappUrl',
      title: 'WhatsApp invite link',
      type: 'url',
      description: 'The join button is hidden without one.',
    }),
    defineField({
      name: 'featured',
      type: 'boolean',
      description: 'Show this group with a photo in the directory below the map.',
      initialValue: false,
    }),
    defineField({
      name: 'photo',
      type: 'imageWithAlt',
      hidden: ({document}) => !document?.featured,
      validation: (rule) =>
        rule.custom((photo, context) =>
          context.document?.featured && !photo ? 'Featured groups need a photo' : true,
        ),
    }),
    defineField({
      name: 'volunteerCount',
      type: 'string',
      description: 'As displayed, e.g. "450+".',
      hidden: ({document}) => !document?.featured,
    }),
    defineField({
      name: 'projectCount',
      type: 'number',
      hidden: ({document}) => !document?.featured,
      validation: (rule) => rule.integer().min(0),
    }),
  ],
  orderings: [{title: 'City', name: 'cityAsc', by: [{field: 'city', direction: 'asc'}]}],
  preview: {
    select: {city: 'city', region: 'region', country: 'country', media: 'photo'},
    prepare: ({city, region, country, media}) => ({
      title: city,
      subtitle: region ?? country,
      media: media ?? PinIcon,
    }),
  },
})

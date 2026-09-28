import {CogIcon} from '@sanity/icons/Cog'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'socials',
      title: 'Social profiles',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'socialProfile',
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              type: 'string',
              options: {
                list: [
                  {title: 'Instagram', value: 'instagram'},
                  {title: 'TikTok', value: 'tiktok'},
                  {title: 'LinkedIn', value: 'linkedin'},
                  {title: 'WhatsApp', value: 'whatsapp'},
                ],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'url',
              type: 'url',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {select: {title: 'platform', subtitle: 'url'}},
        }),
      ],
      validation: (rule) =>
        rule.custom((socials?: {platform?: string}[]) => {
          const platforms = (socials ?? []).map((s) => s.platform).filter(Boolean)
          return new Set(platforms).size === platforms.length || 'Each platform can appear once'
        }),
    }),
    defineField({
      name: 'organization',
      title: 'Organisation details',
      type: 'object',
      description:
        'Used by search engines to describe the association (e.g. in a knowledge panel). Not shown on the site.',
      options: {collapsible: true, collapsed: true},
      fields: [
        defineField({
          name: 'legalName',
          type: 'string',
          description: 'Registered name, if different from "Volunteers".',
        }),
        defineField({name: 'foundingDate', type: 'date'}),
        defineField({
          name: 'address',
          title: 'Registered address',
          type: 'object',
          fields: [
            defineField({name: 'streetAddress', title: 'Street', type: 'string'}),
            defineField({name: 'postalCode', type: 'string'}),
            defineField({name: 'addressLocality', title: 'City', type: 'string'}),
            defineField({
              name: 'addressCountry',
              title: 'Country code',
              type: 'string',
              description: 'Two letters, e.g. IT.',
              validation: (rule) => rule.regex(/^[A-Z]{2}$/, {name: 'ISO country code'}),
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {prepare: () => ({title: 'Site settings'})},
})

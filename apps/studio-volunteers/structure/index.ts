import {CogIcon} from '@sanity/icons/Cog'
import {DocumentsIcon} from '@sanity/icons/Documents'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {HomeIcon} from '@sanity/icons/Home'
import {InfoOutlineIcon} from '@sanity/icons/InfoOutline'
import {PinIcon} from '@sanity/icons/Pin'
import {RocketIcon} from '@sanity/icons/Rocket'
import type {ComponentType} from 'react'
import type {StructureBuilder, StructureResolver} from 'sanity/structure'
import {LOCALES, LOCALIZED_SINGLETONS, SINGLETONS} from '../locales'

/** One fixed-id document per language, e.g. `homePage-it`, grouped under one item. */
function localizedSingleton(
  S: StructureBuilder,
  typeName: string,
  title: string,
  icon?: ComponentType,
) {
  return S.listItem()
    .id(typeName)
    .title(title)
    .icon(icon)
    .child(
      S.list()
        .title(title)
        .items(
          LOCALES.map((locale) =>
            S.listItem()
              .id(`${typeName}-${locale.id}`)
              .title(locale.title)
              .icon(icon)
              .child(
                S.document()
                  .schemaType(typeName)
                  .documentId(`${typeName}-${locale.id}`)
                  .initialValueTemplate(`${typeName}-${locale.id}`)
                  .title(`${title} (${locale.id.toUpperCase()})`),
              ),
          ),
        ),
    )
}

/** A translated type, split into one list per language. */
function translatedList(
  S: StructureBuilder,
  typeName: string,
  title: string,
  icon?: ComponentType,
) {
  return S.listItem()
    .id(typeName)
    .title(title)
    .icon(icon)
    .child(
      S.list()
        .title(title)
        .items(
          LOCALES.map((locale) =>
            S.listItem()
              .id(`${typeName}-${locale.id}`)
              .title(locale.title)
              .icon(icon)
              .child(
                S.documentTypeList(typeName)
                  .title(`${title} (${locale.id.toUpperCase()})`)
                  .filter('_type == $type && language == $language')
                  .params({type: typeName, language: locale.id})
                  .initialValueTemplates([S.initialValueTemplateItem(`${typeName}-${locale.id}`)]),
              ),
          ),
        ),
    )
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site settings')
        .icon(CogIcon)
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      localizedSingleton(S, 'homePage', 'Home page', HomeIcon),
      localizedSingleton(S, 'newsPage', 'News page', DocumentsIcon),
      localizedSingleton(S, 'aboutPage', 'About page', InfoOutlineIcon),
      S.divider(),
      translatedList(S, 'newsPost', 'News posts', DocumentTextIcon),
      translatedList(S, 'project', 'Projects', RocketIcon),
      S.documentTypeListItem('group').title('Groups').icon(PinIcon),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          ![
            ...SINGLETONS,
            ...LOCALIZED_SINGLETONS,
            'newsPost',
            'project',
            'group',
            'translation.metadata',
          ].includes(item.getId() as string),
      ),
    ])

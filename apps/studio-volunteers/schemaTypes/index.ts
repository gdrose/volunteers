import {group} from './documents/group'
import {newsPost} from './documents/news-post'
import {project} from './documents/project'
import {imageWithAlt} from './objects/image-with-alt'
import {seo} from './objects/seo'
import {pullQuote} from './objects/pull-quote'
import {articleBody, simpleText} from './objects/rich-text'
import {aboutPage} from './singletons/about-page'
import {homePage} from './singletons/home-page'
import {newsPage} from './singletons/news-page'
import {siteSettings} from './singletons/site-settings'

export const schemaTypes = [
  // Documents
  newsPost,
  project,
  group,
  // Singletons
  homePage,
  newsPage,
  aboutPage,
  siteSettings,
  // Objects
  imageWithAlt,
  seo,
  pullQuote,
  articleBody,
  simpleText,
]

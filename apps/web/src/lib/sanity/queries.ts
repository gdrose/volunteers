import { defineQuery } from '@sanity/sveltekit';

// Every query takes `$locale` (Paraglide's current locale); localized documents carry it as `language`.

/** Search & sharing overrides (Studio: "Search & sharing"); every field falls back to the page's own. */
const seoProjection = /* groq */ `seo{ metaTitle, metaDescription, shareImage, "noindex": noindex == true }`;
const seoFields = /* groq */ `"seo": ${seoProjection}`;

/**
 * Each language this document is published in (itself included), from the
 * document-internationalization metadata, so hreflang only lists pages that exist.
 */
const translationsField = /* groq */ `"translations": coalesce(
	*[_type == "translation.metadata" && references(^._id)][0].translations[].value->{
		language, "slug": slug.current, "noindex": seo.noindex == true
	},
	[{ language, "slug": slug.current, "noindex": seo.noindex == true }]
)`;

// --- News -----------------------------------------------------------------------------

/**
 * Fields for post cards and article headers. Reading time counts characters: ~1000 a
 * minute for alphabetic scripts, ~500 for Japanese.
 */
const postCardFields = /* groq */ `
	_id,
	title,
	"slug": slug.current,
	excerpt,
	category,
	publishedAt,
	author,
	coverImage,
	"readingMinutes": math::max([
		1,
		round(length(pt::text(body)) / select(language == "ja" => 500, 1000))
	])
`;

/** The featured post (editor's pick, else the latest) and every post, newest first. */
export const NEWS_INDEX_QUERY = defineQuery(`{
	"seo": *[_id == "newsPage-" + $locale][0].${seoProjection},
	"featured": coalesce(
		*[_id == "newsPage-" + $locale][0].featuredPost->{${postCardFields}},
		*[_type == "newsPost" && language == $locale] | order(publishedAt desc)[0]{${postCardFields}}
	),
	"posts": *[_type == "newsPost" && language == $locale && defined(slug.current)]
		| order(publishedAt desc){${postCardFields}}
}`);

export const NEWS_POST_QUERY = defineQuery(`
	*[_type == "newsPost" && language == $locale && slug.current == $slug][0]{
		${postCardFields},
		_updatedAt,
		body,
		"project": project->{ title, teaser, "slug": slug.current },
		${seoFields},
		${translationsField}
	}
`);

/** Stories to read next: same project first, then same category, then the latest. */
export const RELATED_POSTS_QUERY = defineQuery(`
	*[_type == "newsPost" && language == $locale && _id != $id]{
		${postCardFields},
		"score": select(defined($projectSlug) && project->slug.current == $projectSlug => 2, 0)
			+ select(category == $category => 1, 0)
	} | order(score desc, publishedAt desc)[0...3]
`);

export const PROJECT_NEWS_QUERY = defineQuery(`
	*[_type == "newsPost" && language == $locale && project->slug.current == $projectSlug]
		| order(publishedAt desc)[0...3]{${postCardFields}}
`);

// --- Site-wide & home -----------------------------------------------------------------

export const SITE_SETTINGS_QUERY = defineQuery(`
	*[_id == "siteSettings"][0]{
		"socials": socials[]{ _key, platform, url },
		organization{ legalName, foundingDate, address }
	}
`);

/** Project cards and key figures for the home page. */
export const HOME_PAGE_QUERY = defineQuery(`{
	"projects": *[_type == "project" && language == $locale && defined(slug.current)]
		| order(sortOrder asc){
			_id,
			title,
			"slug": slug.current,
			teaser,
			coverImage
		},
	"stats": *[_id == "homePage-" + $locale][0].stats[]{ _key, value, label, description },
	"statsAsOf": *[_id == "homePage-" + $locale][0].statsAsOf,
	"seo": *[_id == "homePage-" + $locale][0].${seoProjection}
}`);

// --- About ----------------------------------------------------------------------------

/** About page content, plus the key figures (edited once, on the Home page) for its hero. */
export const ABOUT_PAGE_QUERY = defineQuery(`
	*[_id == "aboutPage-" + $locale][0]{
		"stats": *[_id == "homePage-" + $locale][0].stats[]{ _key, value, label },
		"statsAsOf": *[_id == "homePage-" + $locale][0].statsAsOf,
		"milestones": milestones[]{ _key, period, title, description, image },
		"offices": offices[]{ _key, scope, title, description, location, email },
		"documents": documents[defined(file.asset)]{
			_key,
			title,
			updatedYear,
			"href": file.asset->url,
			"format": upper(file.asset->extension)
		},
		${seoFields}
	}
`);

// --- Projects -------------------------------------------------------------------------

/** Projects on /what-we-do, each with its photo mosaic. */
export const PROJECT_SHOWCASE_QUERY = defineQuery(`
	*[_type == "project" && language == $locale && defined(slug.current)] | order(sortOrder asc){
		_id,
		title,
		"slug": slug.current,
		teaser,
		showcasePhotos
	}
`);

export const PROJECT_QUERY = defineQuery(`
	*[_type == "project" && language == $locale && slug.current == $slug][0]{
		_id,
		title,
		"slug": slug.current,
		headline,
		headlineEmphasis,
		summary,
		intro,
		body,
		heroImage,
		gallery,
		activities,
		"resources": resources[]{
			_key,
			kind,
			title,
			description,
			shortDescription,
			cover,
			"href": coalesce(url, file.asset->url)
		},
		partners,
		startedYear,
		"impact": impact[]{ _key, value, label, description },
		outcomes,
		_updatedAt,
		${seoFields},
		${translationsField}
	}
`);

// --- Contact --------------------------------------------------------------------------

/** Inbox the contact form writes to: the international office, else the first listed. */
export const CONTACT_EMAIL_QUERY = defineQuery(`
	coalesce(
		*[_id == "aboutPage-" + $locale][0].offices[scope == "international"][0].email,
		*[_id == "aboutPage-" + $locale][0].offices[0].email
	)
`);

// --- Groups ---------------------------------------------------------------------------

/**
 * Every group for the Find a group map, with its description in the current locale
 * (English as fallback), plus the offices whose inbox covers groups without their own.
 */
export const GROUPS_QUERY = defineQuery(`{
	"groups": *[_type == "group" && defined(slug.current)] | order(city asc){
		_id,
		"id": slug.current,
		city,
		region,
		country,
		kind,
		"lat": location.lat,
		"lng": location.lng,
		"description": coalesce(
			description[language == $locale][0].value,
			description[language == "en"][0].value
		),
		email,
		whatsappUrl,
		featured,
		photo,
		volunteerCount,
		projectCount
	},
	"offices": *[_id == "aboutPage-" + $locale][0].offices[]{ scope, email }
}`);

// --- Sitemap --------------------------------------------------------------------------

/** Every indexable CMS page in every language, for /sitemap.xml. */
export const SITEMAP_QUERY = defineQuery(`{
	"documents": *[_type in ["newsPost", "project"] && defined(slug.current) && seo.noindex != true]{
		_type,
		language,
		"slug": slug.current,
		_updatedAt,
		"translationGroup": coalesce(*[_type == "translation.metadata" && references(^._id)][0]._id, _id)
	},
	"hiddenPages": *[_type in ["homePage", "aboutPage", "newsPage"] && seo.noindex == true]{ _type, language }
}`);

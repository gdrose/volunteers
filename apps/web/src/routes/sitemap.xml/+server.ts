import { findGroupLink, footerColumns, mainLinks } from '$lib/components/nav/nav-links';
import { isLocale, locales, type Locale } from '$lib/paraglide/runtime';
import { client } from '$lib/sanity/client';
import { SITEMAP_QUERY } from '$lib/sanity/queries';
import type { SITEMAP_QUERY_RESULT } from '$lib/sanity/sanity.types';
import { sitemapXml, type SitemapPage } from '$lib/server/sitemap';
import { siteOrigin } from '$lib/site';
import type { RequestHandler } from './$types';

/** Placeholder pages (`ComingSoonPage`, noindex): leave them out until they're written. */
const COMING_SOON = new Set(['/donate', '/media-kit', '/privacy']);

const DOCUMENT_PATHS: Record<string, (slug: string) => string> = {
	newsPost: (slug) => `/news/${slug}`,
	project: (slug) => `/what-we-do/${slug}`
};

export const GET: RequestHandler = async ({ url }) => {
	const { documents } = await client.fetch<SITEMAP_QUERY_RESULT>(SITEMAP_QUERY);

	// Every page linked from the navigation, so the sitemap follows the site's own structure.
	const staticPaths = new Set([
		'/',
		...[...mainLinks, findGroupLink, ...footerColumns.flatMap((c) => c.links)].map((l) => l.path)
	]);
	const staticPages: SitemapPage[] = [...staticPaths]
		.filter((path) => !COMING_SOON.has(path))
		.map((path) => ({
			paths: Object.fromEntries(locales.map((locale) => [locale, path]))
		}));

	// Translations of one post or project share a group, so they list each other as alternates.
	const groups = new Map<string, Required<SitemapPage>>();
	for (const doc of documents) {
		if (!isLocale(doc.language)) continue;
		const group = groups.get(doc.translationGroup) ?? { paths: {}, lastmod: {} };
		group.paths[doc.language as Locale] = DOCUMENT_PATHS[doc._type](doc.slug);
		group.lastmod[doc.language as Locale] = doc._updatedAt;
		groups.set(doc.translationGroup, group);
	}

	return new Response(sitemapXml(siteOrigin(url), [...staticPages, ...groups.values()]), {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, max-age=0, s-maxage=3600'
		}
	});
};

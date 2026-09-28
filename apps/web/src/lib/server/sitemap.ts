import { localeAlternates, type LocalePaths } from '$lib/components/shared/seo';
import type { Locale } from '$lib/paraglide/runtime';

/** One page and the languages it exists in; each language becomes its own `<url>`. */
export type SitemapPage = {
	paths: LocalePaths;
	/** Last content change per language (W3C datetime), when known. */
	lastmod?: Partial<Record<Locale, string>>;
};

/**
 * sitemaps.org XML with `xhtml:link` hreflang alternates, as Google documents for multilingual
 * sites: every URL lists all its language versions, itself included, plus `x-default`.
 * The alternates come from `localeAlternates`, so they always match the pages' own `<head>`.
 */
export function sitemapXml(origin: string, pages: SitemapPage[]) {
	const urls = pages.flatMap(({ paths, lastmod }) => {
		const alternates = localeAlternates(new URL(origin), origin, paths);
		const links = alternates
			.map(
				(a) => `\t\t<xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${xml(a.href)}"/>`
			)
			.join('\n');

		return alternates.flatMap(({ hreflang, href }) => {
			if (hreflang === 'x-default') return [];
			const modified = lastmod?.[hreflang];
			return [
				[
					'\t<url>',
					`\t\t<loc>${xml(href)}</loc>`,
					...(modified ? [`\t\t<lastmod>${xml(modified)}</lastmod>`] : []),
					links,
					'\t</url>'
				].join('\n')
			];
		});
	});

	return [
		'<?xml version="1.0" encoding="UTF-8"?>',
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
		...urls,
		'</urlset>',
		''
	].join('\n');
}

function xml(value: string) {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

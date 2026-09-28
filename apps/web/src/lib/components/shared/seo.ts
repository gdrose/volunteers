import {
	baseLocale,
	deLocalizeUrl,
	getLocale,
	isLocale,
	locales,
	localizeUrl,
	type Locale
} from '$lib/paraglide/runtime';

export const SITE_NAME = 'Volunteers';

export type Alternate = { hreflang: Locale | 'x-default'; href: string };

/**
 * Absolute URL of an unlocalized path in a locale (the current one by default).
 * Paraglide gives `/es/` for a localized home, but SvelteKit redirects it to `/es`:
 * canonical, hreflang and structured-data URLs must be the final address, not a redirect.
 */
export function absoluteUrl(path: string, origin: string, locale: Locale = getLocale()) {
	const url = localizeUrl(new URL(path, origin), { locale });
	if (url.pathname !== '/') url.pathname = url.pathname.replace(/\/$/, '');
	return url.href;
}

/** Unlocalized path of a page in each language it exists in, e.g. `{ en: '/news/x', it: '/news/x' }`. */
export type LocalePaths = Partial<Record<Locale, string>>;

/**
 * Absolute URL of a page in every locale it exists in, for `hreflang` alternates.
 * Query strings and hashes are dropped: each alternate points at the page itself.
 * `x-default` is the unprefixed URL, which sends visitors to their saved or browser language,
 * so it's only listed when the page exists in the base locale.
 *
 * @param origin Public site origin, so preview deployments never point search engines at themselves.
 * @param available Pages that aren't translated into every locale (CMS documents); omit when they are.
 */
export function localeAlternates(
	url: URL,
	origin: string = url.origin,
	available?: LocalePaths
): Alternate[] {
	const current = deLocalizeUrl(new URL(url.pathname, origin)).pathname;
	const pathFor = (locale: Locale) => (available ? available[locale] : current);
	const hrefFor = (locale: Locale, path: string) => absoluteUrl(path, origin, locale);

	const alternates: Alternate[] = locales.flatMap((locale) => {
		const path = pathFor(locale);
		return path ? [{ hreflang: locale, href: hrefFor(locale, path) }] : [];
	});
	const base = pathFor(baseLocale);
	if (base) alternates.push({ hreflang: 'x-default', href: hrefFor(baseLocale, base) });
	return alternates;
}

type Translation = { language: string | null; slug: string } | null;

/**
 * Where each published translation of a CMS document lives,
 * e.g. `translationPaths(post.translations, (slug) => `/news/${slug}`)`.
 */
export function translationPaths(
	translations: Translation[],
	pathFor: (slug: string) => string
): LocalePaths {
	const paths: LocalePaths = {};
	for (const t of translations) {
		if (t && isLocale(t.language)) paths[t.language] = pathFor(t.slug);
	}
	return paths;
}

/** `og:locale` wants language_TERRITORY; these are the main audience of each language. */
export const ogLocales: Record<Locale, string> = {
	en: 'en_GB',
	es: 'es_ES',
	it: 'it_IT',
	ja: 'ja_JP',
	nl: 'nl_NL'
};

/** Search results cut descriptions at about this many characters. */
export const META_DESCRIPTION_MAX = 155;

/**
 * Fits page copy (an excerpt, a summary) into a search snippet: the whole sentences that fit,
 * else cut at a word with an ellipsis. Japanese has no spaces, so it's cut at the character.
 */
export function metaDescription(text: string, max = META_DESCRIPTION_MAX) {
	const clean = text.replace(/\s+/g, ' ').trim();
	if (clean.length <= max) return clean;
	const cut = clean.slice(0, max - 1);
	const sentenceEnd = Math.max(...['. ', '! ', '? ', '。'].map((end) => cut.lastIndexOf(end)));
	if (sentenceEnd >= max / 2) return cut.slice(0, sentenceEnd + 1).trim();
	const space = cut.lastIndexOf(' ');
	return `${(space >= max / 2 ? cut.slice(0, space) : cut).replace(/[\s,;:.–—-]+$/, '')}…`;
}

/** Serializes JSON-LD for inline `<script>`: `<` is escaped so CMS text can't close the tag. */
export function jsonLdScript(schema: object) {
	const json = JSON.stringify(schema).replace(/</g, '\\u003c');
	return `<script type="application/ld+json">${json}</script>`;
}

import {
	baseLocale,
	deLocalizeUrl,
	locales,
	localizeUrl,
	type Locale
} from '$lib/paraglide/runtime';

/**
 * Absolute URL of a page in every locale, for `hreflang` alternates.
 * Query strings and hashes are dropped: each alternate points at the page itself.
 * `x-default` is the unprefixed URL, which sends visitors to their saved or browser language.
 */
export function localeAlternates(url: URL): { hreflang: Locale | 'x-default'; href: string }[] {
	const page = deLocalizeUrl(new URL(url.pathname, url.origin));
	const hrefFor = (locale: Locale) => localizeUrl(page, { locale }).href;

	return [
		...locales.map((locale) => ({ hreflang: locale, href: hrefFor(locale) })),
		{ hreflang: 'x-default', href: hrefFor(baseLocale) }
	];
}

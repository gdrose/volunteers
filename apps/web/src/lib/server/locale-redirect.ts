import {
	baseLocale,
	cookieName,
	extractLocaleFromHeader,
	extractLocaleFromUrl,
	localizeUrl,
	toLocale,
	type Locale
} from '$lib/paraglide/runtime';

/**
 * Picks the locale for a visitor who lands on an unprefixed (English) URL:
 * their saved choice (cookie) first, then the browser/OS language (`Accept-Language`).
 * Returns where to redirect, or `undefined` to serve the page as is.
 *
 * Only full-page GETs are redirected; prefixed URLs (`/es/…`) are always honoured,
 * so shared links and the language switcher keep working. Location (IP) is never used:
 * where someone is doesn't tell us which language they read.
 */
export function localeRedirect(request: Request): { url: URL; locale: Locale } | undefined {
	if (request.method !== 'GET' && request.method !== 'HEAD') return;
	if (!isDocumentRequest(request)) return;

	const url = new URL(request.url);
	// A locale prefix in the URL is an explicit choice.
	if (extractLocaleFromUrl(url) !== baseLocale) return;

	const locale = savedLocale(request) ?? extractLocaleFromHeader(request);
	if (!locale || locale === baseLocale) return;

	return { url: localizeUrl(url, { locale }), locale };
}

function isDocumentRequest(request: Request) {
	const dest = request.headers.get('sec-fetch-dest');
	if (dest) return dest === 'document';
	return request.headers.get('accept')?.includes('text/html') ?? false;
}

function savedLocale(request: Request) {
	const prefix = `${cookieName}=`;
	const value = request.headers
		.get('cookie')
		?.split(';')
		.map((c) => c.trim())
		.find((c) => c.startsWith(prefix))
		?.slice(prefix.length);
	return toLocale(value);
}

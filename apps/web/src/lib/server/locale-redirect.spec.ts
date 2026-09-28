import { describe, expect, it } from 'vitest';
import { localeRedirect } from './locale-redirect';

function page(path: string, headers: Record<string, string> = {}, method = 'GET') {
	return new Request(`https://example.org${path}`, {
		method,
		headers: { 'sec-fetch-dest': 'document', ...headers }
	});
}

describe('localeRedirect', () => {
	it('sends a first-time visitor to their browser language', () => {
		const result = localeRedirect(page('/about', { 'accept-language': 'it-IT,it;q=0.9,en;q=0.8' }));
		expect(result?.url.pathname).toBe('/it/about');
	});

	it('respects q-values and falls back past unsupported languages', () => {
		const result = localeRedirect(page('/', { 'accept-language': 'de;q=1,nl;q=0.8,en;q=0.5' }));
		expect(result?.url.pathname).toBe('/nl/');
	});

	it('keeps English when the browser prefers it or nothing matches', () => {
		expect(localeRedirect(page('/', { 'accept-language': 'en-GB,it;q=0.5' }))).toBeUndefined();
		expect(localeRedirect(page('/', { 'accept-language': 'de,fr' }))).toBeUndefined();
		expect(localeRedirect(page('/'))).toBeUndefined();
	});

	it('lets a saved choice win over the browser language', () => {
		const english = page('/', { 'accept-language': 'ja', cookie: 'PARAGLIDE_LOCALE=en' });
		expect(localeRedirect(english)).toBeUndefined();

		const spanish = page('/news', { 'accept-language': 'en', cookie: 'x=1; PARAGLIDE_LOCALE=es' });
		expect(localeRedirect(spanish)?.url.pathname).toBe('/es/news');
	});

	it('never overrides a language already in the URL', () => {
		expect(localeRedirect(page('/es/about', { 'accept-language': 'ja' }))).toBeUndefined();
	});

	it('only redirects full-page GETs', () => {
		const header = { 'accept-language': 'it' };
		expect(localeRedirect(page('/', header, 'POST'))).toBeUndefined();
		expect(
			localeRedirect(page('/__data.json', { ...header, 'sec-fetch-dest': 'empty' }))
		).toBeUndefined();
	});

	it('keeps query strings', () => {
		const result = localeRedirect(page('/find-a-group?q=rome', { 'accept-language': 'it' }));
		expect(result?.url.pathname + result!.url.search).toBe('/it/find-a-group?q=rome');
	});
});

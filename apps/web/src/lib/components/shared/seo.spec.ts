import { describe, expect, it } from 'vitest';
import { jsonLdScript, localeAlternates, translationPaths } from './seo';

const hrefs = (url: string) =>
	Object.fromEntries(localeAlternates(new URL(url)).map((a) => [a.hreflang, a.href]));

describe('localeAlternates', () => {
	it('lists every locale plus x-default for an English page', () => {
		expect(hrefs('https://example.org/about')).toEqual({
			en: 'https://example.org/about',
			es: 'https://example.org/es/about',
			it: 'https://example.org/it/about',
			ja: 'https://example.org/ja/about',
			nl: 'https://example.org/nl/about',
			'x-default': 'https://example.org/about'
		});
	});

	it('gives the same set from a localized page and drops the query', () => {
		expect(hrefs('https://example.org/it/find-a-group?q=roma')).toEqual(
			hrefs('https://example.org/find-a-group')
		);
	});
});

describe('localeAlternates with a public origin', () => {
	it('uses the production origin, not the preview host', () => {
		const alternates = localeAlternates(
			new URL('https://preview-123.vercel.app/es/about'),
			'https://example.org'
		);
		expect(alternates.find((a) => a.hreflang === 'es')?.href).toBe('https://example.org/es/about');
	});
});

describe('localeAlternates for pages in some languages only', () => {
	const url = new URL('https://example.org/it/news/hello');

	it('lists only the translations that exist', () => {
		const alternates = localeAlternates(url, url.origin, {
			en: '/news/hello',
			it: '/news/ciao'
		});
		expect(alternates).toEqual([
			{ hreflang: 'en', href: 'https://example.org/news/hello' },
			{ hreflang: 'it', href: 'https://example.org/it/news/ciao' },
			{ hreflang: 'x-default', href: 'https://example.org/news/hello' }
		]);
	});

	it('drops x-default when there is no English version', () => {
		const alternates = localeAlternates(url, url.origin, { it: '/news/ciao', es: '/news/hola' });
		expect(alternates.map((a) => a.hreflang)).toEqual(['es', 'it']);
	});
});

describe('translationPaths', () => {
	it('keeps published, indexable translations in supported languages', () => {
		const paths = translationPaths(
			[
				{ language: 'en', slug: 'hello', noindex: false },
				{ language: 'it', slug: 'ciao', noindex: true },
				{ language: 'de', slug: 'hallo', noindex: false },
				null
			],
			(slug) => `/news/${slug}`
		);
		expect(paths).toEqual({ en: '/news/hello' });
	});
});

describe('jsonLdScript', () => {
	it('escapes < so CMS text cannot close the script tag', () => {
		const html = jsonLdScript({ name: '</script><script>alert(1)</script>' });
		expect(html.match(/<\/script>/g)).toHaveLength(1);
		expect(html).toContain('\\u003c/script>');
	});
});

describe('localeAlternates for the home page', () => {
	it('uses the URLs SvelteKit serves, without a trailing slash on localized homes', () => {
		expect(hrefs('https://example.org/it')).toMatchObject({
			en: 'https://example.org/',
			it: 'https://example.org/it',
			'x-default': 'https://example.org/'
		});
	});
});

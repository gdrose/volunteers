import { describe, expect, it } from 'vitest';
import { localeAlternates } from './seo';

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

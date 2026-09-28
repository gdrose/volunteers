import { describe, expect, it } from 'vitest';
import { sitemapXml } from './sitemap';

const origin = 'https://example.org';

describe('sitemapXml', () => {
	const xml = sitemapXml(origin, [
		{
			paths: { en: '/news/hello', it: '/news/ciao' },
			lastmod: { en: '2026-09-01T10:00:00Z' }
		}
	]);

	it('declares the sitemap and xhtml namespaces', () => {
		expect(xml).toContain('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
		expect(xml).toContain('xmlns:xhtml="http://www.w3.org/1999/xhtml"');
	});

	it('writes one <url> per language, each listing every version plus x-default', () => {
		const urls = xml.split('<url>').slice(1);
		expect(urls).toHaveLength(2);
		for (const url of urls) {
			expect(url).toContain('hreflang="en" href="https://example.org/news/hello"');
			expect(url).toContain('hreflang="it" href="https://example.org/it/news/ciao"');
			expect(url).toContain('hreflang="x-default" href="https://example.org/news/hello"');
		}
		expect(urls[0]).toContain('<loc>https://example.org/news/hello</loc>');
		expect(urls[1]).toContain('<loc>https://example.org/it/news/ciao</loc>');
	});

	it('adds lastmod only where it is known', () => {
		expect(xml.match(/<lastmod>/g)).toHaveLength(1);
		expect(xml).toContain('<lastmod>2026-09-01T10:00:00Z</lastmod>');
	});

	it('escapes XML special characters', () => {
		expect(sitemapXml(origin, [{ paths: { en: "/news/rock-&-roll's" } }])).toContain(
			'/news/rock-&amp;-roll&apos;s'
		);
	});
});

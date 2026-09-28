import { siteOrigin } from '$lib/site';
import type { RequestHandler } from './$types';

/** Everything may be crawled; placeholders and errors opt out per page with `noindex`. */
export const GET: RequestHandler = ({ url }) =>
	new Response(
		['User-agent: *', 'Allow: /', '', `Sitemap: ${siteOrigin(url)}/sitemap.xml`, ''].join('\n'),
		{ headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
	);

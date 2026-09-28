import { env } from '$env/dynamic/public';

/**
 * Public origin of the production site (`PUBLIC_SITE_URL`), used for canonical URLs, the sitemap
 * and structured data so preview deployments never claim to be the real site.
 * Falls back to the request's own origin when unset (local dev).
 */
export function siteOrigin(url: URL) {
	return env.PUBLIC_SITE_URL ? new URL(env.PUBLIC_SITE_URL).origin : url.origin;
}

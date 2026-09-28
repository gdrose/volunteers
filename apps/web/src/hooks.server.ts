import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { env } from '$env/dynamic/private';
import { getTextDirection } from '$lib/paraglide/runtime';
import { paraglideMiddleware } from '$lib/paraglide/server';
import { localeRedirect } from '$lib/server/locale-redirect';

// Unprefixed (English) URLs send visitors to their saved or browser language, once per choice.
const handleLocaleRedirect: Handle = ({ event, resolve }) => {
	const redirect = localeRedirect(event.request);
	if (!redirect) return resolve(event);

	return new Response(null, {
		status: 307,
		headers: {
			Location: redirect.url.href,
			Vary: 'Accept-Language, Cookie',
			'Cache-Control': 'private, no-store'
		}
	});
};

// Preview and dev deployments must never be indexed; only production is the real site.
const handleRobots: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);
	if (env.VERCEL_ENV !== 'production') response.headers.set('X-Robots-Tag', 'noindex, nofollow');
	return response;
};

const handleParaglide: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request;

		return resolve(event, {
			transformPageChunk: ({ html }) =>
				html
					.replace('%paraglide.lang%', locale)
					.replace('%paraglide.dir%', getTextDirection(locale))
		});
	});

export const handle: Handle = sequence(handleRobots, handleLocaleRedirect, handleParaglide);

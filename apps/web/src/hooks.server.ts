import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
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

export const handle: Handle = sequence(handleLocaleRedirect, handleParaglide);

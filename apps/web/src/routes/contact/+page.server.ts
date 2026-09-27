import { client } from '$lib/sanity/client';
import { CONTACT_EMAIL_QUERY } from '$lib/sanity/queries';
import type { CONTACT_EMAIL_QUERY_RESULT } from '$lib/sanity/sanity.types';
import { getLocale } from '$lib/paraglide/runtime';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const email = await client.fetch<CONTACT_EMAIL_QUERY_RESULT>(CONTACT_EMAIL_QUERY, {
		locale: getLocale()
	});
	return { email };
};

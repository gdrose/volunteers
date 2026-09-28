import { client } from '$lib/sanity/client';
import { CONTACT_EMAIL_QUERY, HOME_PAGE_QUERY } from '$lib/sanity/queries';
import type { CONTACT_EMAIL_QUERY_RESULT, HOME_PAGE_QUERY_RESULT } from '$lib/sanity/sanity.types';
import { getLocale } from '$lib/paraglide/runtime';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const locale = getLocale();
	const [{ projects, stats, statsAsOf }, email] = await Promise.all([
		client.fetch<HOME_PAGE_QUERY_RESULT>(HOME_PAGE_QUERY, { locale }),
		// For the organisation's structured data.
		client.fetch<CONTACT_EMAIL_QUERY_RESULT>(CONTACT_EMAIL_QUERY, { locale })
	]);
	return { projects, stats: stats ?? [], statsAsOf, email };
};

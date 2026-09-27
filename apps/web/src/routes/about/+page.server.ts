import { client } from '$lib/sanity/client';
import { ABOUT_PAGE_QUERY } from '$lib/sanity/queries';
import type { ABOUT_PAGE_QUERY_RESULT } from '$lib/sanity/sanity.types';
import { getLocale } from '$lib/paraglide/runtime';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const about = await client.fetch<ABOUT_PAGE_QUERY_RESULT>(ABOUT_PAGE_QUERY, {
		locale: getLocale()
	});
	return {
		stats: about?.stats ?? [],
		milestones: about?.milestones ?? [],
		offices: about?.offices ?? [],
		documents: about?.documents ?? []
	};
};

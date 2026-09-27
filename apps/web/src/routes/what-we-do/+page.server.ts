import { client } from '$lib/sanity/client';
import { PROJECT_SHOWCASE_QUERY } from '$lib/sanity/queries';
import type { PROJECT_SHOWCASE_QUERY_RESULT } from '$lib/sanity/sanity.types';
import { getLocale } from '$lib/paraglide/runtime';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => ({
	projects: await client.fetch<PROJECT_SHOWCASE_QUERY_RESULT>(PROJECT_SHOWCASE_QUERY, {
		locale: getLocale()
	})
});

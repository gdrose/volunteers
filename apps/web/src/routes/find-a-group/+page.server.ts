import { toLocalGroups } from '$lib/components/groups';
import { client } from '$lib/sanity/client';
import { GROUPS_QUERY } from '$lib/sanity/queries';
import type { GROUPS_QUERY_RESULT } from '$lib/sanity/sanity.types';
import { getLocale } from '$lib/paraglide/runtime';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => ({
	groups: toLocalGroups(
		await client.fetch<GROUPS_QUERY_RESULT>(GROUPS_QUERY, { locale: getLocale() })
	)
});

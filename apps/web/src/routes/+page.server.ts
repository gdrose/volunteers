import { client } from '$lib/sanity/client';
import { HOME_PAGE_QUERY } from '$lib/sanity/queries';
import type { HOME_PAGE_QUERY_RESULT } from '$lib/sanity/sanity.types';
import { getLocale } from '$lib/paraglide/runtime';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const { projects, stats, statsAsOf } = await client.fetch<HOME_PAGE_QUERY_RESULT>(
		HOME_PAGE_QUERY,
		{
			locale: getLocale()
		}
	);
	return { projects, stats: stats ?? [], statsAsOf };
};

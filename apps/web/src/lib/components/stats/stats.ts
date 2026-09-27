import type { HOME_PAGE_QUERY_RESULT } from '$lib/sanity/sanity.types';

export type Stat = NonNullable<HOME_PAGE_QUERY_RESULT['stats']>[number];

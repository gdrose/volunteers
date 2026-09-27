import type { ABOUT_PAGE_QUERY_RESULT } from '$lib/sanity/sanity.types';

type AboutPage = NonNullable<ABOUT_PAGE_QUERY_RESULT>;

export type AboutStat = NonNullable<AboutPage['stats']>[number];
export type Milestone = NonNullable<AboutPage['milestones']>[number];
export type Office = NonNullable<AboutPage['offices']>[number];
export type FoundationDocument = NonNullable<AboutPage['documents']>[number];

import { error } from '@sveltejs/kit';
import { client } from '$lib/sanity/client';
import { PROJECT_NEWS_QUERY, PROJECT_QUERY } from '$lib/sanity/queries';
import type { PROJECT_NEWS_QUERY_RESULT, PROJECT_QUERY_RESULT } from '$lib/sanity/sanity.types';
import { getLocale } from '$lib/paraglide/runtime';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const locale = getLocale();
	const [project, news] = await Promise.all([
		client.fetch<PROJECT_QUERY_RESULT>(PROJECT_QUERY, { locale, slug: params.project }),
		client.fetch<PROJECT_NEWS_QUERY_RESULT>(PROJECT_NEWS_QUERY, {
			locale,
			projectSlug: params.project
		})
	]);
	if (!project) error(404);
	return { project, news };
};

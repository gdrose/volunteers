import { error } from '@sveltejs/kit';
import { client } from '$lib/sanity/client';
import { NEWS_POST_QUERY, RELATED_POSTS_QUERY } from '$lib/sanity/queries';
import type { NEWS_POST_QUERY_RESULT, RELATED_POSTS_QUERY_RESULT } from '$lib/sanity/sanity.types';
import { getLocale } from '$lib/paraglide/runtime';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const locale = getLocale();
	const post = await client.fetch<NEWS_POST_QUERY_RESULT>(NEWS_POST_QUERY, {
		locale,
		slug: params.slug
	});
	if (!post) error(404);

	const related = await client.fetch<RELATED_POSTS_QUERY_RESULT>(RELATED_POSTS_QUERY, {
		locale,
		id: post._id,
		category: post.category,
		projectSlug: post.project?.slug ?? null
	});
	return { post, related };
};

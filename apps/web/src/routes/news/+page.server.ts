import { client } from '$lib/sanity/client';
import { NEWS_INDEX_QUERY } from '$lib/sanity/queries';
import type { NEWS_INDEX_QUERY_RESULT } from '$lib/sanity/sanity.types';
import { getLocale } from '$lib/paraglide/runtime';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const { featured, posts, seo } = await client.fetch<NEWS_INDEX_QUERY_RESULT>(NEWS_INDEX_QUERY, {
		locale: getLocale()
	});
	// The featured post sits above the feed, so it isn't repeated in it.
	return { featured, posts: posts.filter((post) => post._id !== featured?._id), seo };
};

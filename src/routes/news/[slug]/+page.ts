import { error } from '@sveltejs/kit';
import { getPost } from '$lib/components/news';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const post = getPost(params.slug);
	if (!post) error(404);
	return { post };
};

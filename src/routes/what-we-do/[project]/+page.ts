import { error } from '@sveltejs/kit';
import { getProjectDetail } from '$lib/components/projects';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const project = getProjectDetail(params.project);
	if (!project) error(404);
	return { project };
};

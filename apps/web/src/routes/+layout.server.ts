import { client } from '$lib/sanity/client';
import { SITE_SETTINGS_QUERY } from '$lib/sanity/queries';
import type { SITE_SETTINGS_QUERY_RESULT } from '$lib/sanity/sanity.types';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	const settings = await client.fetch<SITE_SETTINGS_QUERY_RESULT>(SITE_SETTINGS_QUERY);
	return { socials: settings?.socials ?? [] };
};

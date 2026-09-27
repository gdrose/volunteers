import { getLocale } from '$lib/paraglide/runtime';
import type { GROUPS_QUERY_RESULT } from '$lib/sanity/sanity.types';

type GroupRecord = GROUPS_QUERY_RESULT['groups'][number];

/** `local`: a local branch (orange on the map); `project`: an ongoing project site (blue). */
export type GroupKind = GroupRecord['kind'];

/** A group ready for the map: placed on it, and with an inbox to contact. */
export type LocalGroup = Omit<GroupRecord, 'lat' | 'lng' | 'email'> & {
	lat: number;
	lng: number;
	/** The group's own inbox, or the office that coordinates groups in its country. */
	email: string;
};

/**
 * Drops groups that can't be placed on the map, and gives each the inbox of the office
 * for its country (Italy, or international) when it has none of its own.
 */
export function toLocalGroups({ groups, offices }: GROUPS_QUERY_RESULT): LocalGroup[] {
	const officeEmail = (country: string) =>
		offices?.find((o) => o.scope === (country === 'IT' ? 'italy' : 'international'))?.email ?? '';
	return groups.flatMap(({ lat, lng, email, ...group }) =>
		lat === null || lng === null
			? []
			: [{ ...group, lat, lng, email: email ?? officeEmail(group.country) }]
	);
}

/** Groups shown with a photo in the directory below the map. */
export function featuredGroups(groups: LocalGroup[]) {
	return groups.filter((group) => group.featured && group.photo);
}

export const findGroup = (groups: LocalGroup[], id: string | null) =>
	groups.find((group) => group.id === id);

/** Region for Italian groups, otherwise the country name in the current locale. */
export function groupArea(group: LocalGroup): string {
	if (group.region) return group.region;
	return (
		new Intl.DisplayNames([getLocale()], { type: 'region' }).of(group.country) ?? group.country
	);
}

const normalize = (text: string) =>
	text
		.normalize('NFD')
		.replace(/\p{Diacritic}/gu, '')
		.toLowerCase()
		.trim();

/**
 * Groups whose city, region or country match the query, accent- and case-insensitive.
 * Prefix matches rank first, then word-start matches, then (3+ characters) mid-word
 * matches; ties are alphabetical by city.
 */
export function searchGroups(groups: LocalGroup[], query: string): LocalGroup[] {
	const q = normalize(query);
	if (!q) return [];

	const ranked: { group: LocalGroup; rank: number }[] = [];
	for (const group of groups) {
		const fields = [group.city, groupArea(group)].map(normalize);
		const rank = fields.some((f) => f.startsWith(q))
			? 0
			: fields.some((f) => f.split(/[\s-]+/).some((word) => word.startsWith(q)))
				? 1
				: // Mid-word matches only once the query is specific enough to not be noise.
					q.length >= 3 && fields.some((f) => f.includes(q))
					? 2
					: -1;
		if (rank >= 0) ranked.push({ group, rank });
	}

	return ranked
		.sort((a, b) => a.rank - b.rank || a.group.city.localeCompare(b.group.city))
		.map(({ group }) => group);
}

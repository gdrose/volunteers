import { getLocale } from '$lib/paraglide/runtime';
import { m } from '$lib/paraglide/messages.js';
import { offices } from '$lib/components/about/contacts';
import cataniaImage from '$lib/assets/projects/citizens/gallery-food-drive.png';
import milanoImage from '$lib/assets/news/youth-record.jpg';
import romaImage from '$lib/assets/projects/children.jpg';

/** `local`: a local branch (orange on the map); `project`: an ongoing project site (blue). */
export type GroupKind = 'local' | 'project';

export type LocalGroup = {
	id: string;
	city: string;
	/** Italian region name; omitted for groups abroad, which show their country instead. */
	region?: string;
	/** ISO 3166-1 alpha-2 country code. */
	country: string;
	kind: GroupKind;
	lat: number;
	lng: number;
	/** Present only for groups featured in the directory below the map. */
	featured?: { image: string; volunteers: string; projects: number };
	/** Short introduction shown in the group details dialog. */
	description?: () => string;
	/** Group inbox; falls back to the Italian or international office (see `groupEmail`). */
	email?: string;
	/** WhatsApp group invite link; the join button is hidden without one. */
	whatsapp?: string;
};

export const groups: LocalGroup[] = [
	{
		id: 'catania',
		city: 'Catania',
		region: 'Sicilia',
		country: 'IT',
		kind: 'local',
		lat: 37.5079,
		lng: 15.083,
    featured: { image: cataniaImage, volunteers: '450+', projects: 12 },
    whatsapp: "#"
	},
	{
		id: 'milano',
		city: 'Milano',
		region: 'Lombardia',
		country: 'IT',
		kind: 'local',
		lat: 45.4642,
		lng: 9.19,
		featured: { image: milanoImage, volunteers: '320+', projects: 8 },
		description: m.find_group_milano_description,
    email: 'milano@volunteers.org',
    whatsapp: "#"
	},
	{
		id: 'roma',
		city: 'Roma',
		region: 'Lazio',
		country: 'IT',
		kind: 'local',
		lat: 41.9028,
		lng: 12.4964,
    featured: { image: romaImage, volunteers: '280+', projects: 6 },
		whatsapp: "#"
	},
	{
		id: 'acireale',
		city: 'Acireale',
		region: 'Sicilia',
		country: 'IT',
		kind: 'local',
		lat: 37.6126,
		lng: 15.1656
	},
	{
		id: 'palermo',
		city: 'Palermo',
		region: 'Sicilia',
		country: 'IT',
		kind: 'local',
		lat: 38.1157,
		lng: 13.3615
	},
	{
		id: 'enna',
		city: 'Enna',
		region: 'Sicilia',
		country: 'IT',
		kind: 'local',
		lat: 37.567,
		lng: 14.2795
	},
	{
		id: 'caltanissetta',
		city: 'Caltanissetta',
		region: 'Sicilia',
		country: 'IT',
		kind: 'local',
		lat: 37.4901,
		lng: 14.0629
	},
	{
		id: 'ragusa',
		city: 'Ragusa',
		region: 'Sicilia',
		country: 'IT',
		kind: 'local',
		lat: 36.9269,
		lng: 14.7255
	},
	{
		id: 'trento',
		city: 'Trento',
		region: 'Trentino-Alto Adige',
		country: 'IT',
		kind: 'local',
		lat: 46.0748,
		lng: 11.1217
	},
	{
		id: 'perugia',
		city: 'Perugia',
		region: 'Umbria',
		country: 'IT',
		kind: 'local',
		lat: 43.1107,
		lng: 12.3908
	},
	{ id: 'rotterdam', city: 'Rotterdam', country: 'NL', kind: 'local', lat: 51.9244, lng: 4.4777 },
	{ id: 'london', city: 'London', country: 'GB', kind: 'local', lat: 51.5072, lng: -0.1276 },
	{ id: 'madrid', city: 'Madrid', country: 'ES', kind: 'project', lat: 40.4168, lng: -3.7038 }
];

export const findGroup = (id: string | null) => groups.find((group) => group.id === id);

/** The group's own inbox, or the office that coordinates groups in its country. */
export function groupEmail(group: LocalGroup): string {
	if (group.email) return group.email;
	const office = offices.find((o) => o.id === (group.country === 'IT' ? 'italy' : 'international'));
	return office?.email ?? '';
}

export const featuredGroups = groups.filter((group) => group.featured);

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
export function searchGroups(query: string): LocalGroup[] {
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

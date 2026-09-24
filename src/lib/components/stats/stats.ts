import { m } from '$lib/paraglide/messages.js';

export type Stat = {
	id: string;
	value: string;
	label: () => string;
	description: () => string;
};

export const stats: Stat[] = [
	{
		id: 'cities',
		value: '20+',
		label: m.stats_cities_label,
		description: m.stats_cities_description
	},
	{
		id: 'volunteers',
		value: '10000+',
		label: m.stats_volunteers_label,
		description: m.stats_volunteers_description
	},
	{
		id: 'projects',
		value: '70+',
		label: m.stats_projects_label,
		description: m.stats_projects_description
	}
];

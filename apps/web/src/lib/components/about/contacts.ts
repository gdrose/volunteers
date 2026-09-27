import { m } from '$lib/paraglide/messages.js';

export type Office = {
	id: string;
	title: () => string;
	description: () => string;
	location: () => string;
	email: string;
};

export const offices: Office[] = [
	{
		id: 'italy',
		title: m.about_contacts_italy_title,
		description: m.about_contacts_italy_description,
		location: m.about_contacts_italy_location,
		email: 'italia@volunteers.org'
	},
	{
		id: 'international',
		title: m.about_contacts_international_title,
		description: m.about_contacts_international_description,
		location: m.about_contacts_international_location,
		email: 'international@volunteers.org'
	}
];

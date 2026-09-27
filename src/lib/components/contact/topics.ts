import { m } from '$lib/paraglide/messages.js';

export type ContactTopic = {
	id: string;
	label: () => string;
};

export const contactTopics: ContactTopic[] = [
	{ id: 'volunteering', label: m.contact_topic_volunteering },
	{ id: 'groups', label: m.contact_topic_groups },
	{ id: 'partnerships', label: m.contact_topic_partnerships },
	{ id: 'press', label: m.contact_topic_press },
	{ id: 'other', label: m.contact_topic_other }
];

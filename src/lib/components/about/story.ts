import { m } from '$lib/paraglide/messages.js';
import catania from '$lib/assets/about/story/catania.png';
import romeMilan from '$lib/assets/about/story/rome-milan.png';
import association from '$lib/assets/about/story/association.png';
import italy from '$lib/assets/about/story/italy.png';
import international from '$lib/assets/about/story/international.png';
import today from '$lib/assets/about/story/today.png';

export type Milestone = {
	id: string;
	/** Year label; the current milestone uses a localized "today" label. */
	year: () => string;
	current?: boolean;
	title: () => string;
	description: () => string;
	image: string;
	/** Vertical crop of the image, matching the design. */
	imagePosition?: string;
};

export const milestones: Milestone[] = [
	{
		id: 'catania',
		year: () => '2022',
		title: m.about_story_catania_title,
		description: m.about_story_catania_description,
		image: catania
	},
	{
		id: 'rome-milan',
		year: () => '2023',
		title: m.about_story_rome_milan_title,
		description: m.about_story_rome_milan_description,
		image: romeMilan
	},
	{
		id: 'association',
		year: () => '2024',
		title: m.about_story_association_title,
		description: m.about_story_association_description,
		image: association
	},
	{
		id: 'italy',
		year: () => '2024',
		title: m.about_story_italy_title,
		description: m.about_story_italy_description,
		image: italy,
		imagePosition: 'object-[center_18%]'
	},
	{
		id: 'international',
		year: () => '2024',
		title: m.about_story_international_title,
		description: m.about_story_international_description,
		image: international,
		imagePosition: 'object-bottom'
	},
	{
		id: 'today',
		year: m.about_story_today,
		current: true,
		title: m.about_story_today_title,
		description: m.about_story_today_description,
		image: today,
		imagePosition: 'object-[center_74%]'
	}
];

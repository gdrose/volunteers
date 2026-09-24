import { m } from '$lib/paraglide/messages.js';
import { getLocale } from '$lib/paraglide/runtime';
import youthRecordImage from '$lib/assets/news/youth-record.jpg';
import cataniaUrbanImage from '$lib/assets/news/catania-urban.jpg';
import rotterdamImage from '$lib/assets/news/rotterdam.jpg';
import clownTherapyImage from '$lib/assets/news/clown-therapy.jpg';
import empathyForumImage from '$lib/assets/news/empathy-forum.jpg';
import milanMealsImage from '$lib/assets/news/milan-meals.jpg';
import palermoWorkshopsImage from '$lib/assets/news/palermo-workshops.jpg';
import avisBolognaImage from '$lib/assets/news/avis-bologna.png';
import intergenerationalWorkshopsImage from '$lib/assets/news/intergenerational-workshops.png';
import neighbourhoodFestivalImage from '$lib/assets/news/neighbourhood-festival.png';
import type { ProjectId } from '$lib/components/projects/projects';

export type NewsCategoryId = 'field-stories' | 'new-locations' | 'medical' | 'culture';

export type NewsCategory = {
	id: NewsCategoryId;
	label: () => string;
};

export type NewsPost = {
	slug: string;
	title: () => string;
	excerpt?: () => string;
	category: NewsCategoryId;
	/** ISO date (YYYY-MM-DD). */
	date: string;
	readingMinutes: number;
	image: string;
	/** Project this story belongs to, shown on that project's page. */
	project?: ProjectId;
};

export const newsCategories: NewsCategory[] = [
	{ id: 'field-stories', label: m.news_category_field_stories },
	{ id: 'new-locations', label: m.news_category_new_locations },
	{ id: 'medical', label: m.news_category_medical },
	{ id: 'culture', label: m.news_category_culture }
];

export const featuredPost: NewsPost = {
	slug: 'youth-record-2026',
	title: m.news_youth_record_title,
	excerpt: m.news_youth_record_excerpt,
	category: 'field-stories',
	date: '2026-05-18',
	readingMinutes: 7,
	image: youthRecordImage
};

export const newsPosts: NewsPost[] = [
	{
		slug: 'avis-bologna-assembly',
		title: m.news_avis_bologna_title,
		category: 'culture',
		date: '2026-09-15',
		readingMinutes: 3,
		image: avisBolognaImage,
		project: 'citizens'
	},
	{
		slug: 'intergenerational-recycling-workshops',
		title: m.news_intergenerational_workshops_title,
		category: 'field-stories',
		date: '2026-09-10',
		readingMinutes: 2,
		image: intergenerationalWorkshopsImage,
		project: 'citizens'
	},
	{
		slug: 'neighbourhood-festival',
		title: m.news_neighbourhood_festival_title,
		category: 'field-stories',
		date: '2026-09-02',
		readingMinutes: 4,
		image: neighbourhoodFestivalImage,
		project: 'citizens'
	},
	{
		slug: 'catania-urban-renewal',
		title: m.news_catania_urban_title,
		category: 'field-stories',
		date: '2026-05-12',
		readingMinutes: 4,
		image: cataniaUrbanImage
	},
	{
		slug: 'rotterdam-joins',
		title: m.news_rotterdam_title,
		category: 'new-locations',
		date: '2026-05-04',
		readingMinutes: 3,
		image: rotterdamImage
	},
	{
		slug: 'clown-therapy-rome',
		title: m.news_clown_therapy_title,
		category: 'medical',
		date: '2026-04-24',
		readingMinutes: 5,
		image: clownTherapyImage
	},
	{
		slug: 'empathy-forum',
		title: m.news_empathy_forum_title,
		category: 'culture',
		date: '2026-04-15',
		readingMinutes: 6,
		image: empathyForumImage
	},
	{
		slug: 'milan-hot-meals',
		title: m.news_milan_meals_title,
		category: 'field-stories',
		date: '2026-04-02',
		readingMinutes: 4,
		image: milanMealsImage
	},
	{
		slug: 'palermo-creative-workshops',
		title: m.news_palermo_workshops_title,
		category: 'culture',
		date: '2026-03-28',
		readingMinutes: 5,
		image: palermoWorkshopsImage
	},
	// Placeholder stories (reusing existing images) until real content is available.
	{
		slug: 'trento-perugia-groups',
		title: m.news_trento_perugia_title,
		category: 'new-locations',
		date: '2026-03-20',
		readingMinutes: 3,
		image: rotterdamImage
	},
	{
		slug: 'pediatric-ward-games',
		title: m.news_pediatric_games_title,
		category: 'medical',
		date: '2026-03-11',
		readingMinutes: 4,
		image: clownTherapyImage
	},
	{
		slug: 'madrid-first-project',
		title: m.news_madrid_title,
		category: 'new-locations',
		date: '2026-03-02',
		readingMinutes: 3,
		image: youthRecordImage
	},
	{
		slug: 'acireale-summer-camp',
		title: m.news_acireale_camp_title,
		category: 'field-stories',
		date: '2026-02-21',
		readingMinutes: 5,
		image: palermoWorkshopsImage
	},
	{
		slug: 'university-talks',
		title: m.news_university_talks_title,
		category: 'culture',
		date: '2026-02-10',
		readingMinutes: 6,
		image: empathyForumImage
	},
	{
		slug: 'rome-food-drive',
		title: m.news_rome_food_drive_title,
		category: 'field-stories',
		date: '2026-01-29',
		readingMinutes: 4,
		image: milanMealsImage
	}
];

export function formatPostDate(date: string) {
	return new Intl.DateTimeFormat(getLocale(), { dateStyle: 'long', timeZone: 'UTC' }).format(
		new Date(date)
	);
}

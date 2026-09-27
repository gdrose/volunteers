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

type Message = () => string;

export type NewsCategoryId = 'field-stories' | 'new-locations' | 'medical' | 'culture';

export type NewsCategory = {
	id: NewsCategoryId;
	label: Message;
};

/** A piece of an article, rendered in order by ArticleBody. */
export type ArticleBlock =
	| { type: 'paragraph'; text: Message }
	| { type: 'heading'; text: Message }
	| { type: 'quote'; text: Message; cite: Message };

const paragraph = (text: Message): ArticleBlock => ({ type: 'paragraph', text });
const heading = (text: Message): ArticleBlock => ({ type: 'heading', text });
const quote = (text: Message, cite: Message): ArticleBlock => ({ type: 'quote', text, cite });

export type NewsPost = {
	slug: string;
	title: Message;
	/** Standfirst: shown under the title and used as the page description. */
	excerpt: Message;
	body: ArticleBlock[];
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
	body: [
		paragraph(m.news_youth_record_p1),
		paragraph(m.news_youth_record_p2),
		heading(m.news_youth_record_heading),
		paragraph(m.news_youth_record_p3),
		quote(m.news_youth_record_quote, m.news_youth_record_quote_cite)
	],
	category: 'field-stories',
	date: '2026-05-18',
	readingMinutes: 7,
	image: youthRecordImage
};

export const newsPosts: NewsPost[] = [
	{
		slug: 'avis-bologna-assembly',
		title: m.news_avis_bologna_title,
		excerpt: m.news_avis_bologna_excerpt,
		body: [
			paragraph(m.news_avis_bologna_p1),
			paragraph(m.news_avis_bologna_p2),
			heading(m.news_avis_bologna_heading),
			paragraph(m.news_avis_bologna_p3),
			quote(m.news_avis_bologna_quote, m.news_avis_bologna_quote_cite)
		],
		category: 'culture',
		date: '2026-09-15',
		readingMinutes: 3,
		image: avisBolognaImage,
		project: 'citizens'
	},
	{
		slug: 'intergenerational-recycling-workshops',
		title: m.news_intergenerational_workshops_title,
		excerpt: m.news_intergenerational_workshops_excerpt,
		body: [
			paragraph(m.news_intergenerational_workshops_p1),
			paragraph(m.news_intergenerational_workshops_p2),
			heading(m.news_intergenerational_workshops_heading),
			paragraph(m.news_intergenerational_workshops_p3),
			quote(m.news_intergenerational_workshops_quote, m.news_intergenerational_workshops_quote_cite)
		],
		category: 'field-stories',
		date: '2026-09-10',
		readingMinutes: 2,
		image: intergenerationalWorkshopsImage,
		project: 'citizens'
	},
	{
		slug: 'neighbourhood-festival',
		title: m.news_neighbourhood_festival_title,
		excerpt: m.news_neighbourhood_festival_excerpt,
		body: [
			paragraph(m.news_neighbourhood_festival_p1),
			paragraph(m.news_neighbourhood_festival_p2),
			heading(m.news_neighbourhood_festival_heading),
			paragraph(m.news_neighbourhood_festival_p3),
			quote(m.news_neighbourhood_festival_quote, m.news_neighbourhood_festival_quote_cite)
		],
		category: 'field-stories',
		date: '2026-09-02',
		readingMinutes: 4,
		image: neighbourhoodFestivalImage,
		project: 'citizens'
	},
	{
		slug: 'catania-urban-renewal',
		title: m.news_catania_urban_title,
		excerpt: m.news_catania_urban_excerpt,
		body: [
			paragraph(m.news_catania_urban_p1),
			paragraph(m.news_catania_urban_p2),
			heading(m.news_catania_urban_heading),
			paragraph(m.news_catania_urban_p3),
			quote(m.news_catania_urban_quote, m.news_catania_urban_quote_cite)
		],
		category: 'field-stories',
		date: '2026-05-12',
		readingMinutes: 4,
		image: cataniaUrbanImage
	},
	{
		slug: 'rotterdam-joins',
		title: m.news_rotterdam_title,
		excerpt: m.news_rotterdam_excerpt,
		body: [
			paragraph(m.news_rotterdam_p1),
			paragraph(m.news_rotterdam_p2),
			heading(m.news_rotterdam_heading),
			paragraph(m.news_rotterdam_p3),
			quote(m.news_rotterdam_quote, m.news_rotterdam_quote_cite)
		],
		category: 'new-locations',
		date: '2026-05-04',
		readingMinutes: 3,
		image: rotterdamImage,
		project: 'international'
	},
	{
		slug: 'clown-therapy-rome',
		title: m.news_clown_therapy_title,
		excerpt: m.news_clown_therapy_excerpt,
		body: [
			paragraph(m.news_clown_therapy_p1),
			paragraph(m.news_clown_therapy_p2),
			heading(m.news_clown_therapy_heading),
			paragraph(m.news_clown_therapy_p3),
			quote(m.news_clown_therapy_quote, m.news_clown_therapy_quote_cite)
		],
		category: 'medical',
		date: '2026-04-24',
		readingMinutes: 5,
		image: clownTherapyImage,
		project: 'medical'
	},
	{
		slug: 'empathy-forum',
		title: m.news_empathy_forum_title,
		excerpt: m.news_empathy_forum_excerpt,
		body: [
			paragraph(m.news_empathy_forum_p1),
			paragraph(m.news_empathy_forum_p2),
			heading(m.news_empathy_forum_heading),
			paragraph(m.news_empathy_forum_p3),
			quote(m.news_empathy_forum_quote, m.news_empathy_forum_quote_cite)
		],
		category: 'culture',
		date: '2026-04-15',
		readingMinutes: 6,
		image: empathyForumImage
	},
	{
		slug: 'milan-hot-meals',
		title: m.news_milan_meals_title,
		excerpt: m.news_milan_meals_excerpt,
		body: [
			paragraph(m.news_milan_meals_p1),
			paragraph(m.news_milan_meals_p2),
			heading(m.news_milan_meals_heading),
			paragraph(m.news_milan_meals_p3),
			quote(m.news_milan_meals_quote, m.news_milan_meals_quote_cite)
		],
		category: 'field-stories',
		date: '2026-04-02',
		readingMinutes: 4,
		image: milanMealsImage
	},
	{
		slug: 'palermo-creative-workshops',
		title: m.news_palermo_workshops_title,
		excerpt: m.news_palermo_workshops_excerpt,
		body: [
			paragraph(m.news_palermo_workshops_p1),
			paragraph(m.news_palermo_workshops_p2),
			heading(m.news_palermo_workshops_heading),
			paragraph(m.news_palermo_workshops_p3),
			quote(m.news_palermo_workshops_quote, m.news_palermo_workshops_quote_cite)
		],
		category: 'culture',
		date: '2026-03-28',
		readingMinutes: 5,
		image: palermoWorkshopsImage,
		project: 'children'
	},
	// Placeholder stories (reusing existing images) until real content is available.
	{
		slug: 'trento-perugia-groups',
		title: m.news_trento_perugia_title,
		excerpt: m.news_trento_perugia_excerpt,
		body: [
			paragraph(m.news_trento_perugia_p1),
			paragraph(m.news_trento_perugia_p2),
			heading(m.news_trento_perugia_heading),
			paragraph(m.news_trento_perugia_p3),
			quote(m.news_trento_perugia_quote, m.news_trento_perugia_quote_cite)
		],
		category: 'new-locations',
		date: '2026-03-20',
		readingMinutes: 3,
		image: rotterdamImage
	},
	{
		slug: 'pediatric-ward-games',
		title: m.news_pediatric_games_title,
		excerpt: m.news_pediatric_games_excerpt,
		body: [
			paragraph(m.news_pediatric_games_p1),
			paragraph(m.news_pediatric_games_p2),
			heading(m.news_pediatric_games_heading),
			paragraph(m.news_pediatric_games_p3),
			quote(m.news_pediatric_games_quote, m.news_pediatric_games_quote_cite)
		],
		category: 'medical',
		date: '2026-03-11',
		readingMinutes: 4,
		image: clownTherapyImage,
		project: 'medical'
	},
	{
		slug: 'madrid-first-project',
		title: m.news_madrid_title,
		excerpt: m.news_madrid_excerpt,
		body: [
			paragraph(m.news_madrid_p1),
			paragraph(m.news_madrid_p2),
			heading(m.news_madrid_heading),
			paragraph(m.news_madrid_p3),
			quote(m.news_madrid_quote, m.news_madrid_quote_cite)
		],
		category: 'new-locations',
		date: '2026-03-02',
		readingMinutes: 3,
		image: youthRecordImage,
		project: 'international'
	},
	{
		slug: 'acireale-summer-camp',
		title: m.news_acireale_camp_title,
		excerpt: m.news_acireale_camp_excerpt,
		body: [
			paragraph(m.news_acireale_camp_p1),
			paragraph(m.news_acireale_camp_p2),
			heading(m.news_acireale_camp_heading),
			paragraph(m.news_acireale_camp_p3),
			quote(m.news_acireale_camp_quote, m.news_acireale_camp_quote_cite)
		],
		category: 'field-stories',
		date: '2026-02-21',
		readingMinutes: 5,
		image: palermoWorkshopsImage,
		project: 'children'
	},
	{
		slug: 'university-talks',
		title: m.news_university_talks_title,
		excerpt: m.news_university_talks_excerpt,
		body: [
			paragraph(m.news_university_talks_p1),
			paragraph(m.news_university_talks_p2),
			heading(m.news_university_talks_heading),
			paragraph(m.news_university_talks_p3),
			quote(m.news_university_talks_quote, m.news_university_talks_quote_cite)
		],
		category: 'culture',
		date: '2026-02-10',
		readingMinutes: 6,
		image: empathyForumImage
	},
	{
		slug: 'rome-food-drive',
		title: m.news_rome_food_drive_title,
		excerpt: m.news_rome_food_drive_excerpt,
		body: [
			paragraph(m.news_rome_food_drive_p1),
			paragraph(m.news_rome_food_drive_p2),
			heading(m.news_rome_food_drive_heading),
			paragraph(m.news_rome_food_drive_p3),
			quote(m.news_rome_food_drive_quote, m.news_rome_food_drive_quote_cite)
		],
		category: 'field-stories',
		date: '2026-01-29',
		readingMinutes: 4,
		image: milanMealsImage
	}
];

const allPosts = [featuredPost, ...newsPosts];

export function getPost(slug: string) {
	return allPosts.find((post) => post.slug === slug);
}

/** Other stories to read next: same project first, then same category, then the latest. */
export function relatedPosts(post: NewsPost, count = 3) {
	const score = (other: NewsPost) =>
		(post.project && other.project === post.project ? 2 : 0) +
		(other.category === post.category ? 1 : 0);
	return allPosts
		.filter((other) => other.slug !== post.slug)
		.map((other, index) => ({ other, index, score: score(other) }))
		.sort((a, b) => b.score - a.score || a.index - b.index)
		.slice(0, count)
		.map(({ other }) => other);
}

export function formatPostDate(date: string) {
	return new Intl.DateTimeFormat(getLocale(), { dateStyle: 'long', timeZone: 'UTC' }).format(
		new Date(date)
	);
}

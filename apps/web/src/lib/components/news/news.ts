import { m } from '$lib/paraglide/messages.js';
import { getLocale } from '$lib/paraglide/runtime';
import type { NEWS_INDEX_QUERY_RESULT, NEWS_POST_QUERY_RESULT } from '$lib/sanity/sanity.types';

type Message = () => string;

/** A post as shown on cards and in article headers. */
export type NewsPost = NEWS_INDEX_QUERY_RESULT['posts'][number];

export type NewsArticle = NonNullable<NEWS_POST_QUERY_RESULT>;

export type NewsCategoryId = NewsPost['category'];

export type NewsCategory = {
	id: NewsCategoryId;
	label: Message;
};

export const newsCategories: NewsCategory[] = [
	{ id: 'field-stories', label: m.news_category_field_stories },
	{ id: 'new-locations', label: m.news_category_new_locations },
	{ id: 'medical', label: m.news_category_medical },
	{ id: 'culture', label: m.news_category_culture }
];

export function formatPostDate(date: string) {
	return new Intl.DateTimeFormat(getLocale(), { dateStyle: 'long', timeZone: 'UTC' }).format(
		new Date(date)
	);
}

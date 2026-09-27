import type { HOME_PAGE_QUERY_RESULT } from '$lib/sanity/sanity.types';
import { getLocale } from '$lib/paraglide/runtime';

export type Stat = NonNullable<HOME_PAGE_QUERY_RESULT['stats']>[number];

/**
 * Figures are typed in the Studio as displayed (e.g. "10000+"): format the number for the
 * current locale ("10,000+", "10.000+") and keep any prefix or suffix as written.
 */
export function formatStatValue(value: string) {
	return value.replace(/\d(?:[\d.,]*\d)?/, (number) => {
		// "10.000" / "10,000" are grouped thousands; "2,5" / "2.5" are decimals.
		const grouped = /^\d{1,3}(?:[.,]\d{3})+$/.test(number);
		const parsed = Number(grouped ? number.replace(/[.,]/g, '') : number.replace(',', '.'));
		return Number.isFinite(parsed) ? new Intl.NumberFormat(getLocale()).format(parsed) : number;
	});
}

/** "As of" date for the key figures, e.g. "September 2026". */
export function formatStatsDate(date: string) {
	return new Intl.DateTimeFormat(getLocale(), {
		month: 'long',
		year: 'numeric',
		timeZone: 'UTC'
	}).format(new Date(date));
}

import { m } from '$lib/paraglide/messages.js';

/** Single source for site navigation: header, mobile menu and both footers read from here. */
export type NavLink = { label: () => string; path: string };

/** Main sections, in header order. */
export const mainLinks: NavLink[] = [
	{ label: m.nav_about, path: '/about' },
	{ label: m.nav_what_we_do, path: '/what-we-do' },
	{ label: m.nav_news, path: '/news' }
];

export const findGroupLink: NavLink = { label: m.nav_find_group, path: '/find-a-group' };

/** Header calls to action: joining starts by finding a local group. */
export const joinLink: NavLink = { label: m.nav_join, path: '/find-a-group' };
export const donateLink: NavLink = { label: m.nav_donate, path: '/donate' };

export const footerColumns: { title: string | (() => string); links: NavLink[] }[] = [
	{
		title: 'Volunteers',
		links: [
			{ label: m.nav_about, path: '/about' },
			{ label: m.nav_what_we_do, path: '/what-we-do' }
		]
	},
	{
		title: m.footer_what_you_can_do,
		links: [{ label: m.footer_volunteer, path: '/find-a-group' }, donateLink]
	},
	{
		title: m.footer_contacts,
		links: [
			{ label: m.footer_contact_us, path: '/contact' },
			{ label: m.footer_locations, path: '/locations' },
			{ label: m.footer_media_kit, path: '/media-kit' }
		]
	}
];

/**
 * `aria-current` for a nav link: "page" on the section's own page, "true" anywhere
 * inside it (e.g. an article under News), so both get the active style.
 */
export function navCurrent(currentPath: string, path: string): 'page' | 'true' | undefined {
	if (currentPath === path) return 'page';
	if (path !== '/' && currentPath.startsWith(`${path}/`)) return 'true';
	return undefined;
}

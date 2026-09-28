import { locales } from '$lib/paraglide/runtime';
import { urlFor, type SanityImageValue } from '$lib/sanity/image';
import { SITE_NAME, absoluteUrl } from './seo';

/**
 * schema.org structured data (JSON-LD) builders, following Google Search Central:
 * Organization on the home page, Article on posts, BreadcrumbList wherever a breadcrumb shows.
 * Render them with `json-ld.svelte`.
 */

type Address = {
	streetAddress?: string | null;
	postalCode?: string | null;
	addressLocality?: string | null;
	addressCountry?: string | null;
} | null;

export type OrganizationDetails = {
	legalName?: string | null;
	foundingDate?: string | null;
	address?: Address;
} | null;

const orgId = (origin: string) => `${origin}/#organization`;

/** Name, URL and logo: enough for search engines to tie a page to the association. */
function organizationRef(origin: string) {
	return {
		'@type': 'NGO',
		'@id': orgId(origin),
		name: SITE_NAME,
		url: `${origin}/`,
		logo: { '@type': 'ImageObject', url: `${origin}/logo.png`, width: 512, height: 512 }
	};
}

export function organization(input: {
	origin: string;
	description: string;
	socials: { url: string }[];
	email?: string | null;
	details?: OrganizationDetails;
}) {
	const { origin, description, socials, email, details } = input;
	const address = details?.address;
	return {
		...organizationRef(origin),
		description,
		...(details?.legalName && { legalName: details.legalName }),
		...(details?.foundingDate && { foundingDate: details.foundingDate }),
		...(email && { email }),
		...(socials.length && { sameAs: socials.map((s) => s.url) }),
		...(address &&
			Object.values(address).some(Boolean) && {
				address: { '@type': 'PostalAddress', ...withoutEmpty(address) }
			})
	};
}

export function website(origin: string) {
	return {
		'@type': 'WebSite',
		'@id': `${origin}/#website`,
		name: SITE_NAME,
		url: `${origin}/`,
		inLanguage: [...locales],
		publisher: { '@id': orgId(origin) }
	};
}

export function article(input: {
	origin: string;
	url: string;
	locale: string;
	headline: string;
	description: string;
	image: SanityImageValue;
	datePublished: string;
	dateModified: string;
	author?: string | null;
	section?: string;
}) {
	const { origin, image } = input;
	// Google picks the crop that fits each surface: 16:9, 4:3 and 1:1, at least 1200px wide.
	const crop = (w: number, h: number) => urlFor(image).width(w).height(h).fit('crop').url();
	return {
		'@type': 'Article',
		mainEntityOfPage: input.url,
		headline: input.headline,
		description: input.description,
		image: [crop(1200, 675), crop(1200, 900), crop(1200, 1200)],
		datePublished: input.datePublished,
		dateModified: input.dateModified,
		inLanguage: input.locale,
		...(input.section && { articleSection: input.section }),
		author: input.author
			? { '@type': 'Person', name: input.author }
			: { '@id': orgId(origin), '@type': 'NGO', name: SITE_NAME },
		publisher: organizationRef(origin)
	};
}

/** The visible breadcrumb trail; the last crumb (the current page) has no link. */
export function breadcrumbList(origin: string, trail: { label: string; path?: string }[]) {
	return {
		'@type': 'BreadcrumbList',
		itemListElement: trail.map((crumb, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			name: crumb.label,
			...(crumb.path && { item: absoluteUrl(crumb.path, origin) })
		}))
	};
}

/** One JSON-LD document holding several nodes, which can reference each other by `@id`. */
export function graph(...nodes: object[]) {
	return { '@context': 'https://schema.org', '@graph': nodes };
}

function withoutEmpty<T extends object>(value: T) {
	return Object.fromEntries(Object.entries(value).filter(([, v]) => v));
}

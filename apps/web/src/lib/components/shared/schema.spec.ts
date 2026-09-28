import { describe, expect, it } from 'vitest';
import { breadcrumbList, organization } from './schema';

const origin = 'https://example.org';

describe('breadcrumbList', () => {
	it('numbers the trail and links every crumb but the current page', () => {
		const list = breadcrumbList(origin, [
			{ label: 'Home', path: '/' },
			{ label: 'News', path: '/news' },
			{ label: 'A story' }
		]);
		expect(list.itemListElement).toEqual([
			{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://example.org/' },
			{ '@type': 'ListItem', position: 2, name: 'News', item: 'https://example.org/news' },
			{ '@type': 'ListItem', position: 3, name: 'A story' }
		]);
	});
});

describe('organization', () => {
	it('leaves out details the CMS has not filled in', () => {
		const org = organization({
			origin,
			description: 'Youth volunteering',
			socials: [],
			email: null,
			details: { legalName: null, foundingDate: null, address: { addressCountry: null } }
		});
		expect(Object.keys(org).sort()).toEqual(
			['@id', '@type', 'description', 'logo', 'name', 'url'].sort()
		);
	});

	it('links social profiles and the registered address', () => {
		const org = organization({
			origin,
			description: 'Youth volunteering',
			socials: [{ url: 'https://instagram.com/volunteers' }],
			details: { address: { addressLocality: 'Catania', addressCountry: 'IT', postalCode: null } }
		});
		expect(org).toMatchObject({
			sameAs: ['https://instagram.com/volunteers'],
			address: { '@type': 'PostalAddress', addressLocality: 'Catania', addressCountry: 'IT' }
		});
		expect(org.address).not.toHaveProperty('postalCode');
	});
});

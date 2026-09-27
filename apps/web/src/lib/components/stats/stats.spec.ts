import { describe, expect, it, vi } from 'vitest';

let locale = 'en';
vi.mock('$lib/paraglide/runtime', () => ({ getLocale: () => locale }));

const { formatStatValue } = await import('./stats');

describe('formatStatValue', () => {
	it('groups thousands for the current locale and keeps the suffix', () => {
		locale = 'en';
		expect(formatStatValue('10000+')).toBe('10,000+');
		locale = 'it';
		expect(formatStatValue('10000+')).toBe('10.000+');
	});

	it('reads grouped and decimal input as typed in the Studio', () => {
		locale = 'en';
		expect(formatStatValue('10.000+')).toBe('10,000+');
		expect(formatStatValue('2,5k')).toBe('2.5k');
		expect(formatStatValue('~120')).toBe('~120');
	});

	it('leaves values without a number untouched', () => {
		expect(formatStatValue('Many')).toBe('Many');
	});
});

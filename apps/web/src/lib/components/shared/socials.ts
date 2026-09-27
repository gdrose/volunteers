import type { SITE_SETTINGS_QUERY_RESULT } from '$lib/sanity/sanity.types';

export type SocialProfile = NonNullable<NonNullable<SITE_SETTINGS_QUERY_RESULT>['socials']>[number];

export type SocialId = SocialProfile['platform'];

const names: Record<SocialId, string> = {
	instagram: 'Instagram',
	tiktok: 'TikTok',
	linkedin: 'LinkedIn',
	whatsapp: 'WhatsApp'
};

/** Pairs each social profile (from Site settings) with the icon variant used where it's rendered. */
export function socialLinks(socials: SocialProfile[], icons: Record<SocialId, string>) {
	return socials.map((social) => ({
		id: social.platform,
		name: names[social.platform],
		url: social.url,
		icon: icons[social.platform]
	}));
}

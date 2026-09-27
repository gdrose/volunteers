export const socials = [
	{ id: 'instagram', name: 'Instagram', url: 'https://www.instagram.com/volunteers.ita/' },
	{ id: 'tiktok', name: 'TikTok', url: 'https://www.tiktok.com/@volunteers.italia' },
	{ id: 'linkedin', name: 'LinkedIn', url: 'https://www.linkedin.com/company/volunteersita' },
	{ id: 'whatsapp', name: 'WhatsApp', url: 'https://linktr.ee/Volunteers_ita' }
] as const;

export type SocialId = (typeof socials)[number]['id'];

/** Pairs each social profile with the icon variant used where it's rendered. */
export function socialLinks(icons: Record<SocialId, string>) {
	return socials.map((social) => ({ ...social, icon: icons[social.id] }));
}

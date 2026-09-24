<script lang="ts">
	import type { Pathname } from '$app/types';
	import { resolve } from '$app/paths';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { Container } from '$lib/components/shared';
	import { m } from '$lib/paraglide/messages.js';
	import instagramLogo from '$lib/assets/social/black/instagram.svg';
	import tiktokLogo from '$lib/assets/social/black/tiktok.svg';
	import linkedinLogo from '$lib/assets/social/black/linkedin.svg';
	import whatsappLogo from '$lib/assets/social/black/whatsapp.svg';
	import instagramCircle from '$lib/assets/social/circle/instagram.svg';
	import tiktokCircle from '$lib/assets/social/circle/tiktok.svg';
	import linkedinCircle from '$lib/assets/social/circle/linkedin.svg';
	import whatsappCircle from '$lib/assets/social/circle/whatsapp.svg';
	import visFoundationLogo from '$lib/assets/footer/vis-foundation.png';
	import MobileFooter from './mobile-footer.svelte';

	const socialLinks = [
		{ name: 'Instagram', icon: instagramLogo },
		{ name: 'TikTok', icon: tiktokLogo },
		{ name: 'LinkedIn', icon: linkedinLogo },
		{ name: 'WhatsApp', icon: whatsappLogo }
	];

	const circleSocialLinks = [
		{ name: 'Instagram', icon: instagramCircle },
		{ name: 'TikTok', icon: tiktokCircle },
		{ name: 'LinkedIn', icon: linkedinCircle },
		{ name: 'WhatsApp', icon: whatsappCircle }
	];

	const columns = [
		{
			title: 'Volunteers',
			links: [
				{ label: m.nav_about, path: '/about' },
				{ label: m.nav_what_we_do, path: '/what-we-do' }
			]
		},
		{
			title: m.footer_what_you_can_do,
			links: [
				{ label: m.footer_volunteer, path: '/volunteer' },
				{ label: m.nav_donate, path: '/donate' }
			]
		},
		{
			title: m.footer_contacts,
			links: [
				{ label: m.footer_contact_us, path: '/contact' },
				{ label: m.footer_locations, path: '/locations' },
				{ label: m.footer_media_kit, path: '/media-kit' }
			]
		}
	] as const;
</script>

<footer class="hidden w-full flex-col bg-background lg:flex">
	<div class="w-full bg-muted">
		<Container
			class="flex flex-col items-center justify-between gap-6 py-8 lg:h-40 lg:flex-row lg:py-0"
		>
			<p class="max-w-[622px] text-h3 font-semibold text-foreground">
				{m.footer_social_cta()}
			</p>
			<div class="flex shrink-0 items-center gap-3.5">
				{#each circleSocialLinks as social (social.name)}
					<span class="shrink-0">
						<img src={social.icon} alt={social.name} class="size-16" />
					</span>
				{/each}
			</div>
		</Container>
	</div>

	<Container class="flex items-start justify-between gap-10 py-12">
		<div class="flex flex-col items-center gap-3">
			<a href={resolve(localizeHref('/') as Pathname)} class="flex items-center">
				<img src="/wordmark.svg" alt="Volunteers" class="h-auto w-22" />
			</a>
			<div class="flex items-center gap-2">
				{#each socialLinks as social (social.name)}
					<span class="shrink-0">
						<img src={social.icon} alt={social.name} class="size-6" />
					</span>
				{/each}
			</div>
		</div>

		<nav class="flex gap-10">
			{#each columns as column (column.title)}
				<div class="flex w-[130px] flex-col gap-2">
					<p class="text-body font-extrabold text-primary">
						{typeof column.title === 'string' ? column.title : column.title()}
					</p>
					{#each column.links as link (link.path)}
						<a
							href={resolve(localizeHref(link.path) as Pathname)}
							class="text-caption font-medium text-foreground"
						>
							{link.label()}
						</a>
					{/each}
				</div>
			{/each}
		</nav>

		<div class="flex flex-col items-center gap-0.5">
			<img src={visFoundationLogo} alt="VIS Foundation" class="size-14 object-cover" />
			<span
				class="inline-flex items-center rounded-full bg-foreground px-3 py-2 text-micro font-black whitespace-nowrap text-background"
			>
				<span class="text-[#ffbf00]">VIS</span>&nbsp;FOUNDATION
			</span>
		</div>
	</Container>
</footer>

<MobileFooter />

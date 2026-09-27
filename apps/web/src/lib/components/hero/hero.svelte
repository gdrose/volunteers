<script lang="ts">
	import { Container, socialLinks, type SocialProfile } from '$lib/components/shared';
	import type { Pathname } from '$app/types';
	import { resolve } from '$app/paths';
	import { Button } from '$lib/components/ui/button/index.js';
	import HeroTitle from './hero-title.svelte';
	import instagramLogo from '$lib/assets/social/blue/instagram.svg';
	import tiktokLogo from '$lib/assets/social/blue/tiktok.svg';
	import linkedinLogo from '$lib/assets/social/blue/linkedin.svg';
	import whatsappLogo from '$lib/assets/social/blue/whatsapp.svg';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages.js';

	let { socials: profiles }: { socials: SocialProfile[] } = $props();

	const socials = $derived(
		socialLinks(profiles, {
			instagram: instagramLogo,
			tiktok: tiktokLogo,
			linkedin: linkedinLogo,
			whatsapp: whatsappLogo
		})
	);
</script>

<Container
	as="section"
	class="flex flex-col gap-6 pt-8 pb-10 lg:flex-row lg:items-center lg:gap-12 lg:py-3"
>
	<div class="flex flex-col gap-6 lg:min-w-0 lg:flex-1">
		<HeroTitle />

		<p class="text-lead text-muted-foreground lg:text-foreground">
			{m.hero_description()}
		</p>

		<div class="flex flex-col gap-4">
			<Button href={resolve(localizeHref('/find-a-group') as Pathname)} class="w-full lg:w-60">
				{m.nav_find_group()}
			</Button>

			<div class="flex items-center justify-center gap-6 lg:hidden">
				{#each socials as social (social.id)}
					<!-- eslint-disable svelte/no-navigation-without-resolve -- external profile URL -->
					<a
						href={social.url}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={social.name}
						class="shrink-0 rounded-sm p-0.5 transition-opacity hover:opacity-70"
					>
						<img src={social.icon} alt="" class="size-5" />
					</a>
					<!-- eslint-enable svelte/no-navigation-without-resolve -->
				{/each}
			</div>
		</div>
	</div>

	<!-- LCP image: load it first, never lazily. -->
	<enhanced:img
		src="$lib/assets/hero/hero.png"
		alt={m.hero_image_alt()}
		fetchpriority="high"
		sizes="(min-width: 64rem) 480px, 100vw"
		class="h-60 w-full rounded-2xl object-cover lg:h-112 lg:w-120 lg:shrink-0 lg:rounded-none"
	/>
</Container>

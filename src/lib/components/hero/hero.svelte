<script lang="ts">
	import { Container } from '$lib/components/shared';
	import type { Pathname } from '$app/types';
	import { resolve } from '$app/paths';
	import { Button } from '$lib/components/ui/button/index.js';
	import HeroTitle from './hero-title.svelte';
	import heroImage from '$lib/assets/hero/hero.png';
	import instagramLogo from '$lib/assets/social/blue/instagram.svg';
	import tiktokLogo from '$lib/assets/social/blue/tiktok.svg';
	import linkedinLogo from '$lib/assets/social/blue/linkedin.svg';
	import whatsappLogo from '$lib/assets/social/blue/whatsapp.svg';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages.js';

	const socialLinks = [
		{ name: 'Instagram', icon: instagramLogo },
		{ name: 'TikTok', icon: tiktokLogo },
		{ name: 'LinkedIn', icon: linkedinLogo },
		{ name: 'WhatsApp', icon: whatsappLogo }
	];
</script>

<Container
	as="section"
	class="flex flex-col gap-6 pt-8 pb-10 lg:flex-row lg:items-center lg:gap-[50px] lg:py-3"
>
	<div class="flex flex-col gap-6 lg:min-w-0 lg:flex-1">
		<HeroTitle />

		<p
			class="text-[15px] leading-[22px] font-light text-muted-foreground lg:text-base lg:leading-normal lg:tracking-[-0.03em] lg:text-foreground"
		>
			{m.hero_description()}
		</p>

		<div class="flex flex-col gap-4">
			<Button
				href={resolve(localizeHref('/find-a-group') as Pathname)}
				size="cta"
				class="w-full lg:w-60"
			>
				{m.hero_cta()}
			</Button>

			<div class="flex items-center justify-center gap-6 lg:hidden">
				{#each socialLinks as social (social.name)}
					<span class="shrink-0">
						<img src={social.icon} alt={social.name} class="size-5" />
					</span>
				{/each}
			</div>
		</div>
	</div>

	<img
		src={heroImage}
		alt={m.hero_image_alt()}
		class="h-60 w-full rounded-2xl object-cover lg:h-112 lg:w-120 lg:shrink-0 lg:rounded-none"
	/>
</Container>

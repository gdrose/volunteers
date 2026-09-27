<script lang="ts">
	import type { Pathname } from '$app/types';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button/index.js';
	import LanguageSwitcher from './language-switcher.svelte';
	import MobileNavbar from './mobile-navbar.svelte';
	import {
		donateLink,
		findGroupLink,
		joinLink,
		mainLinks,
		navCurrent,
		type NavLink
	} from './nav-links';
	import { Container, socialLinks, type SocialProfile } from '$lib/components/shared';
	import instagramLogo from '$lib/assets/social/instagram.svg';
	import tiktokLogo from '$lib/assets/social/tiktok.svg';
	import linkedinLogo from '$lib/assets/social/linkedin.svg';
	import whatsappLogo from '$lib/assets/social/whatsapp.svg';
	import { deLocalizeUrl, localizeHref } from '$lib/paraglide/runtime';

	let { socials: profiles }: { socials: SocialProfile[] } = $props();

	const socials = $derived(
		socialLinks(profiles, {
			instagram: instagramLogo,
			tiktok: tiktokLogo,
			linkedin: linkedinLogo,
			whatsapp: whatsappLogo
		})
	);

	const currentPath = $derived(deLocalizeUrl(page.url).pathname);

	// Height of the top bar (h-16): once it has scrolled away, the sticky nav row takes over
	// the CTAs. Only the row's contents swap, so nothing on the page shifts (CLS).
	const topBarHeight = 64;
	let scrolled = $state(false);

	$effect(() => {
		const onScroll = () => {
			scrolled = window.scrollY > topBarHeight;
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});
</script>

{#snippet navLink(link: NavLink)}
	<a
		href={resolve(localizeHref(link.path) as Pathname)}
		aria-current={navCurrent(currentPath, link.path)}
		class="group relative font-bold whitespace-nowrap text-foreground"
	>
		{link.label()}
		<span
			class="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 bg-primary transition-transform duration-300 ease-out group-hover:scale-x-100 group-aria-[current]:scale-x-100"
			aria-hidden="true"
		></span>
	</a>
{/snippet}

{#snippet ctas(size: 'sm' | 'default')}
	<Button href={resolve(localizeHref(joinLink.path) as Pathname)} {size}>
		{joinLink.label()}
	</Button>
	<Button href={resolve(localizeHref(donateLink.path) as Pathname)} variant="outline" {size}>
		{donateLink.label()}
	</Button>
{/snippet}

<!-- The top bar scrolls away with the page; only the nav row below it is sticky. -->
<header class="hidden w-full bg-background lg:block">
	<Container class="flex h-16 items-center justify-between gap-4">
		<a href={resolve(localizeHref('/') as Pathname)} class="flex shrink-0 items-center">
			<img src="/wordmark.svg" alt="Volunteers" class="h-8 w-auto" />
		</a>

		<div class="flex items-center gap-4">
			<LanguageSwitcher />
			{@render ctas('default')}
		</div>
	</Container>
</header>

<div
	class={[
		'sticky top-0 z-40 hidden w-full lg:block',
		scrolled ? 'border-b border-border bg-background' : 'bg-muted'
	]}
>
	<Container class="flex h-12 items-center justify-between gap-3">
		<nav class="flex items-center gap-7">
			{#each mainLinks as link (link.path)}
				{@render navLink(link)}
			{/each}
			<span class="h-4 w-px bg-foreground" aria-hidden="true"></span>
			{@render navLink(findGroupLink)}
		</nav>

		{#if scrolled}
			<div class="flex items-center gap-3">
				{@render ctas('sm')}
			</div>
		{:else}
			<div class="flex items-center gap-2.5">
				{#each socials as social (social.id)}
					<!-- eslint-disable svelte/no-navigation-without-resolve -- external profile URL -->
					<a
						href={social.url}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={social.name}
						class="shrink-0 rounded-sm transition-opacity hover:opacity-70"
					>
						<img src={social.icon} alt="" class="size-7" />
					</a>
					<!-- eslint-enable svelte/no-navigation-without-resolve -->
				{/each}
			</div>
		{/if}
	</Container>
</div>

<MobileNavbar socials={profiles} />

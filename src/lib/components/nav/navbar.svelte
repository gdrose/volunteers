<script lang="ts">
	import type { Pathname } from '$app/types';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { slide } from 'svelte/transition';
	import { Button } from '$lib/components/ui/button/index.js';
	import LanguageSwitcher from './language-switcher.svelte';
	import MobileNavbar from './mobile-navbar.svelte';
	import instagramLogo from '$lib/assets/social/instagram.svg';
	import tiktokLogo from '$lib/assets/social/tiktok.svg';
	import linkedinLogo from '$lib/assets/social/linkedin.svg';
	import whatsappLogo from '$lib/assets/social/whatsapp.svg';
	import { deLocalizeUrl, localizeHref } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages.js';

	const navLinks = [
		{ label: m.nav_about, path: '/about' },
		{ label: m.nav_what_we_do, path: '/what-we-do' },
		{ label: m.nav_news, path: '/news' }
	] as const;

	const findGroupPath = '/find-a-group';

	const socialLinks = [
		{ name: 'Instagram', icon: instagramLogo },
		{ name: 'TikTok', icon: tiktokLogo },
		{ name: 'LinkedIn', icon: linkedinLogo },
		{ name: 'WhatsApp', icon: whatsappLogo }
	];

	const currentPath = $derived(deLocalizeUrl(page.url).pathname);

	const stickyThreshold = 64;
	let scrolled = $state(false);

	$effect(() => {
		const onScroll = () => {
			scrolled = window.scrollY > stickyThreshold;
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});
</script>

{#snippet navLink(path: string, label: string)}
	{@const active = currentPath === path}
	<a
		href={resolve(localizeHref(path) as Pathname)}
		class="group relative font-bold whitespace-nowrap text-foreground"
	>
		{label}
		<span
			class={[
				'absolute inset-x-0 -bottom-0.5 h-0.5 origin-left bg-primary transition-transform duration-300 ease-out',
				active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
			]}
			aria-hidden="true"
		></span>
	</a>
{/snippet}

<header class="sticky top-0 z-40 hidden w-full flex-col bg-background lg:flex">
	{#if !scrolled}
		<div
			transition:slide={{ duration: 200 }}
			class="mx-auto flex w-full max-w-275 flex-wrap items-center justify-between gap-x-4 gap-y-2 px-6 py-3 lg:h-16 lg:flex-nowrap lg:py-0"
		>
			<a href={resolve(localizeHref('/') as Pathname)} class="flex shrink-0 items-center">
				<img src="/wordmark.svg" alt="Volunteers" class="h-6 w-auto lg:h-8" />
			</a>

			<div class="flex items-center gap-3 sm:gap-4">
				<LanguageSwitcher />
				<Button size="lg">
					{m.nav_join()}
				</Button>
				<Button variant="outline" size="lg">
					{m.nav_donate()}
				</Button>
			</div>
		</div>
	{/if}

	<div class={scrolled ? 'w-full border-b border-border bg-background' : 'w-full bg-muted'}>
		<div
			class="mx-auto flex w-full max-w-275 flex-wrap items-center justify-between gap-3 px-6 py-2 lg:h-12 lg:py-0"
		>
			<nav class="flex flex-wrap items-center gap-4 lg:gap-7">
				{#each navLinks as link (link.path)}
					{@render navLink(link.path, link.label())}
				{/each}
				<span class="h-4 w-px bg-foreground" aria-hidden="true"></span>
				{@render navLink(findGroupPath, m.nav_find_group())}
			</nav>

			{#if scrolled}
				<div class="flex items-center gap-3">
					<Button size="sm">
						{m.nav_join()}
					</Button>
					<Button variant="outline" size="sm">
						{m.nav_donate()}
					</Button>
				</div>
			{:else}
				<div class="flex items-center gap-2.5">
					{#each socialLinks as social (social.name)}
						<span class="shrink-0">
							<img src={social.icon} alt={social.name} class="size-7" />
						</span>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</header>

<MobileNavbar />

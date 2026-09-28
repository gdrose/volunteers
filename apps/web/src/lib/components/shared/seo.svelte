<script lang="ts">
	import { page } from '$app/state';
	import { m } from '$lib/paraglide/messages.js';
	import { getLocale } from '$lib/paraglide/runtime';
	import { localeAlternates } from './seo';

	type Props = {
		/** Page name; the site name is appended. Omit on the home page. */
		title?: string;
		description: string;
		/** Absolute URL of the social preview image. */
		image?: string;
		type?: 'website' | 'article';
	};

	let { title, description, image, type = 'website' }: Props = $props();

	const fullTitle = $derived(
		title ? `${title} · Volunteers` : `Volunteers · ${m.hero_title()} ${m.hero_title_highlight()}`
	);

	// Same page in each language, so search engines link the versions and show the right one.
	const alternates = $derived(localeAlternates(page.url));
	const canonical = $derived(alternates.find((a) => a.hreflang === getLocale())?.href);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	{#if canonical}
		<link rel="canonical" href={canonical} />
	{/if}
	{#each alternates as { hreflang, href } (hreflang)}
		<link rel="alternate" {hreflang} {href} />
	{/each}
	<meta property="og:type" content={type} />
	<meta property="og:title" content={title ?? fullTitle} />
	<meta property="og:description" content={description} />
	{#if image}
		<meta property="og:image" content={image} />
	{/if}
</svelte:head>

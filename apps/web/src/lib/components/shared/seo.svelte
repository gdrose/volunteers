<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';

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
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	<meta property="og:type" content={type} />
	<meta property="og:title" content={title ?? fullTitle} />
	<meta property="og:description" content={description} />
	{#if image}
		<meta property="og:image" content={image} />
	{/if}
</svelte:head>

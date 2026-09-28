<script lang="ts">
	import { page } from '$app/state';
	import { m } from '$lib/paraglide/messages.js';
	import { getLocale } from '$lib/paraglide/runtime';
	import { shareImageUrl, type SanityImageValue } from '$lib/sanity/image';
	import { siteOrigin } from '$lib/site';
	import { SITE_NAME, localeAlternates, ogLocales, type LocalePaths } from './seo';

	type Props = {
		/** Page name; the site name is appended. Omit on the home page. */
		title?: string;
		description: string;
		/** Absolute URL of the social preview image, cropped to 1200×630. Defaults to the brand card. */
		image?: string;
		imageAlt?: string;
		type?: 'website' | 'article';
		/** CMS pages that don't exist in every language: the path in each language that has it. */
		translations?: LocalePaths;
		/** Keep the page out of search results (errors, placeholders). */
		noindex?: boolean;
		/** Editor overrides from the CMS "Search & sharing" fields; each wins over the prop above. */
		cms?: {
			metaTitle: string | null;
			metaDescription: string | null;
			shareImage: SanityImageValue | null;
			noindex: boolean;
		} | null;
	};

	let props: Props = $props();

	const title = $derived(props.cms?.metaTitle || props.title);
	const description = $derived(props.cms?.metaDescription || props.description);
	const shareImage = $derived(props.cms?.shareImage?.asset ? props.cms.shareImage : undefined);
	const image = $derived(shareImage ? shareImageUrl(shareImage) : props.image);
	const imageAlt = $derived(shareImage ? (shareImage.alt ?? undefined) : props.imageAlt);
	const noindex = $derived(props.cms?.noindex || props.noindex);

	const fullTitle = $derived(
		title
			? `${title} · ${SITE_NAME}`
			: `${SITE_NAME} · ${m.hero_title()} ${m.hero_title_highlight()}`
	);

	const origin = $derived(siteOrigin(page.url));
	// Same page in each language, so search engines link the versions and show the right one.
	const alternates = $derived(localeAlternates(page.url, origin, props.translations));
	const canonical = $derived(alternates.find((a) => a.hreflang === getLocale())?.href);
	const otherLocales = $derived(
		alternates.flatMap((a) =>
			a.hreflang === 'x-default' || a.hreflang === getLocale() ? [] : [ogLocales[a.hreflang]]
		)
	);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	{#if noindex}
		<meta name="robots" content="noindex" />
	{:else}
		{#if canonical}
			<link rel="canonical" href={canonical} />
		{/if}
		{#each alternates as { hreflang, href } (hreflang)}
			<link rel="alternate" {hreflang} {href} />
		{/each}
	{/if}
	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:type" content={props.type ?? 'website'} />
	<meta property="og:title" content={title ?? fullTitle} />
	<meta property="og:description" content={description} />
	{#if canonical && !noindex}
		<meta property="og:url" content={canonical} />
	{/if}
	<meta property="og:locale" content={ogLocales[getLocale()]} />
	{#each otherLocales as locale (locale)}
		<meta property="og:locale:alternate" content={locale} />
	{/each}
	<meta property="og:image" content={image ?? `${origin}/og-default.png`} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	{#if image ? imageAlt : true}
		<meta property="og:image:alt" content={image ? imageAlt : m.seo_default_image_alt()} />
	{/if}
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<script lang="ts">
	import type { Pathname } from '$app/types';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { Container, JsonLd, PageBreadcrumb, SanityImage, Seo } from '$lib/components/shared';
	import { article, graph } from '$lib/components/shared/schema';
	import { absoluteUrl, translationPaths } from '$lib/components/shared/seo';
	import {
		ArticleBody,
		PostMeta,
		RelatedPosts,
		ShareButton,
		newsCategories
	} from '$lib/components/news';
	import { shareImageUrl } from '$lib/sanity/image';
	import { siteOrigin } from '$lib/site';
	import { NewsletterSection } from '$lib/components/newsletter';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { getLocale, localizeHref } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const post = $derived(data.post);
	const category = $derived(newsCategories.find((c) => c.id === post.category));
	const project = $derived(post.project);
	const origin = $derived(siteOrigin(page.url));
</script>

<Seo
	title={post.title}
	description={post.excerpt}
	type="article"
	image={shareImageUrl(post.coverImage)}
	imageAlt={post.coverImage.alt ?? undefined}
	translations={translationPaths(post.translations, (slug) => `/news/${slug}`)}
/>
<svelte:head>
	<meta property="article:published_time" content={post.publishedAt} />
	<meta property="article:modified_time" content={post._updatedAt} />
	{#if category}
		<meta property="article:section" content={category.label()} />
	{/if}
</svelte:head>
<JsonLd
	schema={graph(
		article({
			origin,
			url: absoluteUrl(`/news/${post.slug}`, origin),
			locale: getLocale(),
			headline: post.title,
			description: post.excerpt,
			image: post.coverImage,
			datePublished: post.publishedAt,
			dateModified: post._updatedAt,
			author: post.author,
			section: category?.label()
		})
	)}
/>

<Container as="article" class="flex flex-col gap-8 pt-8 pb-12 lg:gap-12 lg:pt-10 lg:pb-16">
	<!-- Header and body share one reading column; the photo runs the full content width. -->
	<header class="mx-auto flex w-full max-w-3xl flex-col items-start gap-4 lg:gap-5">
		<PageBreadcrumb crumbs={[{ label: m.nav_news(), path: '/news' }, { label: post.title }]} />
		{#if category}
			<Badge variant="outline-primary" size="pill">{category.label()}</Badge>
		{/if}
		<h1 class="text-h1 text-foreground">{post.title}</h1>
		<p class="text-lead text-muted-foreground">{post.excerpt}</p>
		<div class="flex w-full flex-wrap items-center justify-between gap-4 pt-1">
			<PostMeta {post} />
			<ShareButton title={post.title} />
		</div>
	</header>

	<SanityImage
		image={post.coverImage}
		width={1280}
		fetchpriority="high"
		class="aspect-4/3 w-full rounded-2xl object-cover sm:aspect-video lg:aspect-2/1 lg:rounded-3xl"
	/>

	<ArticleBody value={post.body} class="mx-auto w-full max-w-3xl" />

	{#if project}
		<Card.Root variant="callout" class="mx-auto w-full max-w-3xl">
			<p class="text-eyebrow text-primary uppercase">{m.news_article_project()}</p>
			<Card.Title role="heading" aria-level={2}>{project.title}</Card.Title>
			<Card.Description>{project.teaser}</Card.Description>
			<Button href={resolve(localizeHref(`/what-we-do/${project.slug}`) as Pathname)} size="lg">
				{m.what_we_do_cta({ project: project.title })}<span aria-hidden="true">→</span>
			</Button>
		</Card.Root>
	{/if}
</Container>

<RelatedPosts posts={data.related} title={m.news_article_more()} />
<NewsletterSection />

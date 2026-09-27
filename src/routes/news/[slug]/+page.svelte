<script lang="ts">
	import type { Pathname } from '$app/types';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { Container, PageBreadcrumb } from '$lib/components/shared';
	import {
		ArticleBody,
		PostMeta,
		RelatedPosts,
		ShareButton,
		newsCategories,
		relatedPosts
	} from '$lib/components/news';
	import { projects } from '$lib/components/projects';
	import { NewsletterSection } from '$lib/components/newsletter';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const post = $derived(data.post);
	const category = $derived(newsCategories.find((c) => c.id === post.category));
	const project = $derived(projects.find((p) => p.id === post.project));
	const related = $derived(relatedPosts(post));
</script>

<svelte:head>
	<title>{post.title()} · Volunteers</title>
	<meta name="description" content={post.excerpt()} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={post.title()} />
	<meta property="og:description" content={post.excerpt()} />
	<meta property="og:image" content={new URL(post.image, page.url).href} />
	<meta property="article:published_time" content={post.date} />
</svelte:head>

<main>
	<Container as="article" class="flex flex-col gap-8 pt-8 pb-12 lg:gap-12 lg:pt-10 lg:pb-16">
		<!-- Header and body share one reading column; the photo runs the full content width. -->
		<header class="mx-auto flex w-full max-w-3xl flex-col items-start gap-4 lg:gap-5">
			<PageBreadcrumb crumbs={[{ label: m.nav_news(), path: '/news' }, { label: post.title() }]} />
			{#if category}
				<Badge variant="outline-primary" size="pill">{category.label()}</Badge>
			{/if}
			<h1 class="text-h1 text-foreground">{post.title()}</h1>
			<p class="text-lead text-muted-foreground">{post.excerpt()}</p>
			<div class="flex w-full flex-wrap items-center justify-between gap-4 pt-1">
				<PostMeta {post} />
				<ShareButton title={post.title()} />
			</div>
		</header>

		<img
			src={post.image}
			alt=""
			class="aspect-4/3 w-full rounded-[20px] object-cover sm:aspect-video lg:aspect-2/1 lg:rounded-[24px]"
		/>

		<ArticleBody blocks={post.body} class="mx-auto w-full max-w-3xl" />

		{#if project}
			<Card.Root variant="callout" class="mx-auto w-full max-w-3xl">
				<p class="text-eyebrow text-primary uppercase">{m.news_article_project()}</p>
				<Card.Title role="heading" aria-level={2}>{project.title()}</Card.Title>
				<Card.Description>{project.description()}</Card.Description>
				<Button href={resolve(localizeHref(`/what-we-do/${project.id}`) as Pathname)} size="cta-xl">
					{m.what_we_do_cta({ project: project.title() })}<span aria-hidden="true">→</span>
				</Button>
			</Card.Root>
		{/if}
	</Container>

	<RelatedPosts posts={related} title={m.news_article_more()} />
	<NewsletterSection />
</main>

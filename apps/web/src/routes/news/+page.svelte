<script lang="ts">
	import { PageLayout } from '$lib/components/shared';
	import { FeaturedPost, NewsFeed } from '$lib/components/news';
	import { NewsletterSection } from '$lib/components/newsletter';
	import { m } from '$lib/paraglide/messages.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<PageLayout crumbs={[{ label: m.nav_news() }]} description={m.news_description()}>
	{#snippet title()}
		{m.news_title_before()}<span class="text-primary">{m.news_title_highlight()}</span
		>{m.news_title_after()}
	{/snippet}

	{#if data.featured}
		<FeaturedPost post={data.featured} />
	{/if}
	<NewsFeed posts={data.posts} />
	<NewsletterSection />
</PageLayout>

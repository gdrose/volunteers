<script lang="ts">
	import * as ToggleGroup from '$lib/components/ui/toggle-group/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import PostCard from './post-card.svelte';
	import { newsCategories, newsPosts, type NewsCategoryId } from './news';
	import { m } from '$lib/paraglide/messages.js';

	const pageSize = 6;

	let category = $state<NewsCategoryId | 'all'>('all');
	let visibleCount = $state(pageSize);

	const filters = $derived([
		{ id: 'all' as const, label: m.news_filter_all() },
		...newsCategories.map((c) => ({ id: c.id, label: c.label() }))
	]);

	const posts = $derived(
		category === 'all' ? newsPosts : newsPosts.filter((post) => post.category === category)
	);
	const visiblePosts = $derived(posts.slice(0, visibleCount));
</script>

<section aria-labelledby="news-feed-title" class="flex flex-col gap-8 lg:gap-12">
	<h2 id="news-feed-title" class="sr-only">{m.news_latest()}</h2>

	<ToggleGroup.Root
		type="single"
		variant="chip"
		size="chip"
		spacing={3}
		aria-label={m.news_filter_label()}
		bind:value={
			() => category,
			// Keep one filter selected: ignore the "deselect" emitted when clicking the active chip.
			(value) => {
				if (!value) return;
				category = value as NewsCategoryId | 'all';
				visibleCount = pageSize;
			}
		}
		class="flex-wrap"
	>
		{#each filters as filter (filter.id)}
			<ToggleGroup.Item value={filter.id}>{filter.label}</ToggleGroup.Item>
		{/each}
	</ToggleGroup.Root>

	<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-10">
		{#each visiblePosts as post (post.slug)}
			<PostCard {post} />
		{/each}
	</div>

	{#if visibleCount < posts.length}
		<div class="flex justify-center pt-6">
			<Button variant="outline-strong" size="load-more" onclick={() => (visibleCount += pageSize)}>
				{m.news_load_more()}<span aria-hidden="true">→</span>
			</Button>
		</div>
	{/if}
</section>

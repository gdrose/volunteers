<script lang="ts">
	import type { Pathname } from '$app/types';
	import { resolve } from '$app/paths';
	import { Container } from '$lib/components/shared';
	import { Button } from '$lib/components/ui/button/index.js';
	import PostCard from './post-card.svelte';
	import type { NewsPost } from './news';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages.js';

	let { posts, title }: { posts: NewsPost[]; title: string } = $props();

	const titleId = $props.id();
</script>

{#if posts.length}
	<section aria-labelledby={titleId} class="w-full border-t lg:border-t-0">
		<Container class="flex flex-col items-center gap-6 pt-10 pb-12 lg:gap-10 lg:pt-14 lg:pb-18">
			<h2 id={titleId} class="text-center text-h2 text-foreground">
				{title}
			</h2>

			<div class="grid w-full gap-4 lg:grid-cols-3 lg:gap-8">
				{#each posts as post (post.slug)}
					<PostCard {post} />
				{/each}
			</div>

			<Button
				href={resolve(localizeHref('/news') as Pathname)}
				variant="outline-strong"
				size="load-more"
				class="w-full lg:w-auto"
			>
				{m.project_news_see_all()}<span aria-hidden="true">→</span>
			</Button>
		</Container>
	</section>
{/if}

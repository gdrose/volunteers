<script lang="ts">
	import type { Pathname } from '$app/types';
	import { resolve } from '$app/paths';
	import { SanityImage } from '$lib/components/shared';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import PostMeta from './post-meta.svelte';
	import type { NewsPost } from './news';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages.js';

	let { post }: { post: NewsPost } = $props();
</script>

<Card.Root variant="featured" role="article">
	<SanityImage
		image={post.coverImage}
		width={800}
		alt=""
		sizes="(min-width: 64rem) 600px, 100vw"
		class="h-60 w-full object-cover sm:h-80 lg:h-105 lg:w-3/5 lg:shrink-0"
	/>

	<div class="flex flex-col items-start gap-4 lg:min-w-0 lg:flex-1 lg:gap-5">
		<h2 class="text-h2 text-foreground">
			{post.title}
		</h2>
		<p class="text-lead text-muted-foreground">
			{post.excerpt}
		</p>
		<PostMeta {post} />
		<Button
			href={resolve(localizeHref(`/news/${post.slug}`) as Pathname)}
			size="lg"
			class="w-full sm:w-auto"
		>
			{m.news_read_article()}<span aria-hidden="true">→</span>
		</Button>
	</div>
</Card.Root>

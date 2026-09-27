<script lang="ts">
	import { formatPostDate, type NewsPost } from './news';
	import { m } from '$lib/paraglide/messages.js';

	let { post }: { post: NewsPost } = $props();
</script>

{#snippet dot()}
	<span class="size-1 shrink-0 rounded-xs bg-muted-foreground" aria-hidden="true"></span>
{/snippet}

<div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-small">
	<time datetime={post.publishedAt} class="text-muted-foreground"
		>{formatPostDate(post.publishedAt)}</time
	>
	{#if post.author}
		{@render dot()}
		<span class="text-muted-foreground">{m.news_by_author({ author: post.author })}</span>
	{/if}
	{@render dot()}
	<span class="font-semibold text-link">
		{m.news_reading_time({ minutes: post.readingMinutes })}
	</span>
</div>

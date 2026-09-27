<script lang="ts">
	import { formatPostDate, type NewsPost } from './news';
	import { m } from '$lib/paraglide/messages.js';

	let { post }: { post: NewsPost } = $props();
</script>

<div class="flex items-center gap-4 text-small">
	<time datetime={post.publishedAt} class="text-muted-foreground"
		>{formatPostDate(post.publishedAt)}</time
	>
	<span class="size-1 rounded-[2px] bg-muted-foreground" aria-hidden="true"></span>
	<span class="font-semibold text-link">
		{m.news_reading_time({ minutes: post.readingMinutes })}
	</span>
</div>

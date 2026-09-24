<script lang="ts">
	import type { Pathname } from '$app/types';
	import { resolve } from '$app/paths';
	import { Button } from '$lib/components/ui/button/index.js';
	import { formatPostDate, type NewsPost } from './news';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages.js';

	let { post }: { post: NewsPost } = $props();
</script>

<article
	class="flex flex-col gap-6 rounded-[20px] bg-muted p-4 lg:flex-row lg:items-center lg:gap-10 lg:rounded-[24px] lg:p-8"
>
	<img
		src={post.image}
		alt=""
		class="h-60 w-full rounded-2xl object-cover sm:h-80 lg:h-[420px] lg:w-3/5 lg:shrink-0"
	/>

	<div class="flex flex-col items-start gap-4 lg:min-w-0 lg:flex-1 lg:gap-5">
		<h2 class="text-h2 text-foreground">
			{post.title()}
		</h2>
		<p class="text-lead text-muted-foreground">
			{post.excerpt?.()}
		</p>
		<div class="flex items-center gap-4 text-small">
			<time datetime={post.date} class="text-muted-foreground">{formatPostDate(post.date)}</time>
			<span class="size-1 rounded-[2px] bg-muted-foreground" aria-hidden="true"></span>
			<span class="font-semibold text-link">
				{m.news_reading_time({ minutes: post.readingMinutes })}
			</span>
		</div>
		<Button
			href={resolve(localizeHref(`/news/${post.slug}`) as Pathname)}
			size="xl"
			class="w-full sm:w-auto"
		>
			{m.news_read_article()}<span aria-hidden="true">→</span>
		</Button>
	</div>
</article>

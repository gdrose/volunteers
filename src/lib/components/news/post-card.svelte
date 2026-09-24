<script lang="ts">
	import type { Pathname } from '$app/types';
	import { resolve } from '$app/paths';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { formatPostDate, type NewsPost } from './news';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages.js';

	let { post }: { post: NewsPost } = $props();
</script>

<Card.Root variant="post">
	<img
		src={post.image}
		alt=""
		loading="lazy"
		class="h-45 w-full rounded-[8px] object-cover transition-transform duration-500 ease-out motion-safe:group-hover/card:scale-105"
	/>

	<Card.Content class="flex flex-1 flex-col gap-3 px-0">
		<Card.Title role="heading" aria-level={3}>
			<a
				href={resolve(localizeHref(`/news/${post.slug}`) as Pathname)}
				class="outline-none after:absolute after:inset-0"
			>
				{post.title()}
			</a>
		</Card.Title>

		<div class="mt-auto flex flex-col gap-3">
			<Separator />
			<div class="flex items-center justify-between text-small">
				<time datetime={post.date} class="text-muted-foreground">
					{formatPostDate(post.date)}
				</time>
				<span class="font-semibold text-link">
					{m.news_reading_time({ minutes: post.readingMinutes })}
				</span>
			</div>
		</div>
	</Card.Content>
</Card.Root>

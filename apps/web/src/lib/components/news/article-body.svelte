<script lang="ts">
	import { PortableText, type PortableTextComponents } from '@portabletext/svelte';
	import { cn } from '$lib/utils.js';
	import ArticleBlock from './article/article-block.svelte';
	import { PortableTextLink } from '$lib/components/shared';
	import ArticleQuote from './article/article-quote.svelte';
	import type { NewsArticle } from './news';

	let { value, class: className }: { value: NewsArticle['body']; class?: string } = $props();

	const components: Partial<PortableTextComponents> = {
		block: ArticleBlock,
		types: { pullQuote: ArticleQuote },
		marks: { link: PortableTextLink }
	};
</script>

<div class={cn('flex flex-col gap-5 lg:gap-6', className)}>
	<PortableText {value} {components} />
</div>

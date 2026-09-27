<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { ArticleBlock } from './news';

	let { blocks, class: className }: { blocks: ArticleBlock[]; class?: string } = $props();
</script>

<div class={cn('flex flex-col gap-5 lg:gap-6', className)}>
	{#each blocks as block, i (i)}
		{#if block.type === 'heading'}
			<h2 class="pt-3 text-h3 text-foreground lg:pt-4">{block.text()}</h2>
		{:else if block.type === 'quote'}
			<figure class="my-2 flex flex-col gap-3 border-s-4 border-primary ps-5 lg:my-4 lg:ps-6">
				<blockquote class="text-h3 text-foreground">
					<p>“{block.text()}”</p>
				</blockquote>
				<figcaption class="text-small text-muted-foreground">{block.cite()}</figcaption>
			</figure>
		{:else}
			<p class="text-lead text-foreground">{block.text()}</p>
		{/if}
	{/each}
</div>

<script lang="ts">
	import type { CustomBlockComponentProps } from '@portabletext/svelte';
	import type { PullQuote } from '$lib/sanity/sanity.types';

	let { portableText }: { portableText: CustomBlockComponentProps<PullQuote> } = $props();

	const quote = $derived(portableText.value);
</script>

<figure class="my-2 flex flex-col gap-3 border-s-4 border-primary ps-5 lg:my-4 lg:ps-6">
	<blockquote class="text-h3 text-foreground">
		<p>“{quote.text}”</p>
	</blockquote>
	{#if quote.attribution}
		<figcaption class="text-small text-muted-foreground">{quote.attribution}</figcaption>
	{/if}
</figure>

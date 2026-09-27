<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { BlockComponentProps } from '@portabletext/svelte';

	let { portableText, children }: { portableText: BlockComponentProps; children?: Snippet } =
		$props();

	const style = $derived(portableText.value.style ?? 'normal');
</script>

{#if style === 'h2'}
	<h2 class="pt-3 text-h3 text-foreground lg:pt-4">{@render children?.()}</h2>
{:else}
	<p class="text-lead text-foreground">{@render children?.()}</p>
{/if}

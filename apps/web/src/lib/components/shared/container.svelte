<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils.js';

	type Props = HTMLAttributes<HTMLElement> & {
		/** Element to render. */
		as?: 'div' | 'section' | 'article';
		children: Snippet;
	};

	let { as = 'div', class: className, children, ...restProps }: Props = $props();

	const classes = $derived(cn('mx-auto w-full max-w-275 px-5 lg:px-6', className));
</script>

<!--
	Site-wide content column: same width and gutters as the navbar and footer,
	so every page's content lines up with them.
	Static tags rather than <svelte:element>: hydrating that re-inserts the node,
	which restarts any CSS animation inside it (e.g. the hero underline).
-->
{#if as === 'section'}
	<section class={classes} {...restProps}>{@render children()}</section>
{:else if as === 'article'}
	<article class={classes} {...restProps}>{@render children()}</article>
{:else}
	<div class={classes} {...restProps}>{@render children()}</div>
{/if}

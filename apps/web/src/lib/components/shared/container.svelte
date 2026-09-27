<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils.js';

	type Props = HTMLAttributes<HTMLElement> & {
		/** Element to render, e.g. `section` or `main`. */
		as?: string;
		children: Snippet;
	};

	let { as = 'div', class: className, children, ...restProps }: Props = $props();
</script>

<!--
	Site-wide content column: same width and gutters as the navbar and footer,
	so every page's content lines up with them.
-->
<svelte:element
	this={as}
	class={cn('mx-auto w-full max-w-275 px-5 lg:px-6', className)}
	{...restProps}
>
	{@render children()}
</svelte:element>

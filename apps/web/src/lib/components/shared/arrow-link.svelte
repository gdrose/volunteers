<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils.js';
	import arrowRight from '$lib/assets/icons/arrow-right.svg';

	let {
		children,
		class: className,
		stretch = false,
		...restProps
	}: HTMLAnchorAttributes & {
		children: Snippet;
		/** Cover the nearest positioned ancestor (e.g. a card) so all of it is clickable; the ancestor shows the focus ring. */
		stretch?: boolean;
	} = $props();
</script>

<a
	class={cn(
		'group inline-flex items-center gap-1.5 text-small font-bold text-link',
		stretch && 'after:absolute after:inset-0 focus-visible:outline-none',
		className
	)}
	{...restProps}
>
	{@render children()}
	<img
		src={arrowRight}
		alt=""
		width="16"
		height="16"
		class="transition-transform duration-200 group-hover:translate-x-0.5"
	/>
</a>

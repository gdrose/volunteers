<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils.js';
	import arrowRight from '$lib/assets/icons/arrow-right.svg';

	let {
		children,
		class: className,
		...restProps
	}: HTMLAnchorAttributes & { children: Snippet } = $props();
</script>

<a
	class={cn('group inline-flex items-center gap-1.5 text-small font-bold text-link', className)}
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

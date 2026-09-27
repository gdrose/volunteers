<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { getEmblaContext } from "./context.js";

	let {
		ref = $bindable(null),
		class: className,
		label,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		/** Accessible name for each dot, e.g. (n) => `Go to slide ${n}`. */
		label: (index: number) => string;
	} = $props();

	const emblaCtx = getEmblaContext("<Carousel.Dots/>");
	const indexes = $derived([...emblaCtx.scrollSnaps.keys()]);
</script>

<div
	bind:this={ref}
	data-slot="carousel-dots"
	class={cn("flex items-center justify-center gap-2", className)}
	{...restProps}
>
	{#each indexes as index (index)}
		<button
			type="button"
			aria-label={label(index + 1)}
			aria-current={index === emblaCtx.selectedIndex ? "true" : undefined}
			class="h-2.5 w-2.5 rounded-full bg-border transition-all outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-current:w-8 aria-current:bg-primary lg:h-2 lg:w-2 lg:aria-current:w-6"
			onclick={() => emblaCtx.scrollTo(index)}
		></button>
	{/each}
</div>

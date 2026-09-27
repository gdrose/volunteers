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
	class={cn("flex items-center justify-center", className)}
	{...restProps}
>
	{#each indexes as index (index)}
		<button
			type="button"
			aria-label={label(index + 1)}
			aria-current={index === emblaCtx.selectedIndex ? "true" : undefined}
			class="group/dot flex h-6 min-w-6 items-center justify-center rounded-full"
			onclick={() => emblaCtx.scrollTo(index)}
		>
			<!-- 24px hit area around the small visual dot. -->
			<span
				class="h-2.5 w-2.5 rounded-full bg-border transition-all group-aria-current/dot:w-8 group-aria-current/dot:bg-primary lg:h-2 lg:w-2 lg:group-aria-current/dot:w-6"
			></span>
		</button>
	{/each}
</div>

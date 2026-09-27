<script lang="ts">
	import ChevronLeftIcon from '@lucide/svelte/icons/chevron-left';
	import { Button, type Props } from "$lib/components/ui/button/index.js";
	import { cn } from "$lib/utils.js";
	import { getEmblaContext } from "./context.js";
	import { carouselEdgeNavVariants, type CarouselNavLayout } from "./carousel-nav.js";
	import type { WithoutChildren } from "bits-ui";

	let {
		ref = $bindable(null),
		class: className,
		variant = "outline",
		size = "icon-sm",
		layout = "button",
		...restProps
	}: WithoutChildren<Props> & { layout?: CarouselNavLayout } = $props();

	const emblaCtx = getEmblaContext("<Carousel.Previous/>");
	const edge = carouselEdgeNavVariants({ side: "start" });
</script>

{#if layout === "edge"}
	<button
		bind:this={ref}
		type="button"
		data-slot="carousel-previous"
		aria-disabled={!emblaCtx.canScrollPrev}
		disabled={!emblaCtx.canScrollPrev}
		class={cn(edge.zone(), className)}
		onclick={emblaCtx.scrollPrev}
		onkeydown={emblaCtx.handleKeyDown}
		{...restProps}
	>
		<span class={edge.chip()}>
			<ChevronLeftIcon class="cn-rtl-flip" />
		</span>
		<span class="sr-only">Previous slide</span>
	</button>
{:else}
	<Button
		data-slot="carousel-previous"
		{variant}
		{size}
		aria-disabled={!emblaCtx.canScrollPrev}
		disabled={!emblaCtx.canScrollPrev}
		class={cn(
			"rounded-full absolute touch-manipulation",
			emblaCtx.orientation === "horizontal"
				? "inset-y-0 -start-12 my-auto"
				: "start-1/2 -top-12 -translate-x-1/2 rotate-90",
			className
		)}
		onclick={emblaCtx.scrollPrev}
		onkeydown={emblaCtx.handleKeyDown}
		{...restProps}
		bind:ref
	>
		<ChevronLeftIcon class="cn-rtl-flip" />
		<span class="sr-only">Previous slide</span>
	</Button>
{/if}

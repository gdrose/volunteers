<script lang="ts">
	import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
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

	const emblaCtx = getEmblaContext("<Carousel.Next/>");
	const edge = carouselEdgeNavVariants({ side: "end" });
</script>

{#if layout === "edge"}
	<button
		bind:this={ref}
		type="button"
		data-slot="carousel-next"
		aria-disabled={!emblaCtx.canScrollNext}
		disabled={!emblaCtx.canScrollNext}
		class={cn(edge.zone(), className)}
		onclick={emblaCtx.scrollNext}
		onkeydown={emblaCtx.handleKeyDown}
		{...restProps}
	>
		<span class={edge.chip()}>
			<ChevronRightIcon class="cn-rtl-flip" />
		</span>
		<span class="sr-only">Next slide</span>
	</button>
{:else}
	<Button
		data-slot="carousel-next"
		{variant}
		{size}
		aria-disabled={!emblaCtx.canScrollNext}
		disabled={!emblaCtx.canScrollNext}
		class={cn(
			"rounded-full absolute touch-manipulation",
			emblaCtx.orientation === "horizontal"
				? "inset-y-0 -end-12 my-auto"
				: "start-1/2 -bottom-12 -translate-x-1/2 rotate-90",
			className
		)}
		onclick={emblaCtx.scrollNext}
		onkeydown={emblaCtx.handleKeyDown}
		bind:ref
		{...restProps}
	>
		<ChevronRightIcon class="cn-rtl-flip" />
		<span class="sr-only">Next slide</span>
	</Button>
{/if}

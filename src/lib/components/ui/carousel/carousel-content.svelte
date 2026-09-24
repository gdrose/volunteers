<script lang="ts" module>
	import { type VariantProps, tv } from "tailwind-variants";

	/** Styles the viewport (the clipping element around the slides). */
	export const carouselContentVariants = tv({
		base: "overflow-hidden",
		variants: {
			variant: {
				default: "",
				// Photo gallery: framed white card on mobile, bare row on desktop.
				gallery: "rounded-[24px] border bg-card p-1 shadow-[0_12px_28px_rgba(17,24,39,0.08)] lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	});

	export type CarouselContentVariant = VariantProps<typeof carouselContentVariants>["variant"];
</script>

<script lang="ts">
	import emblaCarouselSvelte from "embla-carousel-svelte";
	import { cn, type WithElementRef } from "$lib/utils.js";
	import { getEmblaContext } from "./context.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		variant = "default",
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & { variant?: CarouselContentVariant } = $props();

	const emblaCtx = getEmblaContext("<Carousel.Content/>");
</script>

<div
	data-slot="carousel-content"
	class={carouselContentVariants({ variant })}
	use:emblaCarouselSvelte={{
		options: {
			container: "[data-embla-container]",
			slides: "[data-embla-slide]",
			...emblaCtx.options,
			axis: emblaCtx.orientation === "horizontal" ? "x" : "y",
		},
		plugins: emblaCtx.plugins,
	}}
	onemblaInit={emblaCtx.onInit}
>
	<div
		bind:this={ref}
		class={cn(
			"flex",
			emblaCtx.orientation === "horizontal" ? "-ms-4" : "-mt-4 flex-col",
			className
		)}
		data-embla-container=""
		{...restProps}
	>
		{@render children?.()}
	</div>
</div>

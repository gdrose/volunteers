<script lang="ts" module>
	import { type VariantProps, tv } from "tailwind-variants";

	export const cardVariants = tv({
		base: "ring-foreground/10 bg-card text-card-foreground gap-(--card-spacing) overflow-hidden rounded-2xl py-(--card-spacing) text-small ring-1 [--card-spacing:--spacing(6)] has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(4)] *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl group/card flex flex-col",
		variants: {
			variant: {
				default: "",
				// Stacked media card on mobile; transparent media row (image beside text) on desktop.
				// Bordered info card; title/description/footer typography keyed off data-variant.
				contact: "gap-3.5 rounded-2xl [--card-spacing:--spacing(5)] lg:gap-4 lg:rounded-3xl lg:[--card-spacing:--spacing(7)]",
				// Solid brand panel (orange, white text), e.g. the newsletter sign-up.
				brand: "gap-4 rounded-xl bg-primary p-5 text-primary-foreground ring-0 sm:gap-5 sm:p-6 lg:gap-6 lg:rounded-lg lg:px-28 lg:pt-12 lg:pb-10",
				// Centered call-to-action panel; children sit directly in the card.
				callout: "items-center gap-3.5 rounded-2xl bg-muted px-(--card-spacing) text-center [--card-spacing:--spacing(5)] lg:gap-4 lg:rounded-3xl lg:[--card-spacing:--spacing(10)]",
				// Muted panel wrapping a form; same radii and spacing as the callout, left-aligned.
				form: "gap-6 rounded-2xl bg-muted px-(--card-spacing) [--card-spacing:--spacing(5)] lg:gap-8 lg:rounded-3xl lg:[--card-spacing:--spacing(10)]",
				// Borderless project tile: rounded image on top, title/description/link below; the (stretched) link covers the card.
				project: "relative gap-4 overflow-visible has-[a:focus-visible]:ring-3 has-[a:focus-visible]:ring-ring has-[a:focus-visible]:ring-offset-2 has-[a:focus-visible]:ring-offset-background rounded-2xl p-4 ring-0 has-[>img:first-child]:pt-4 lg:gap-4 lg:rounded-3xl lg:p-3 lg:pb-6 lg:has-[>img:first-child]:pt-3",
				// Borderless news tile: image on top, title and meta row below; the title link covers the card.
				post: "relative gap-4 overflow-visible rounded-xl p-4 ring-0 has-[a:focus-visible]:ring-3 has-[a:focus-visible]:ring-ring has-[a:focus-visible]:ring-offset-2 has-[a:focus-visible]:ring-offset-background has-[>img:first-child]:pt-4",
				// Lead story on the news page: muted panel, image beside the text on desktop.
				featured: "gap-6 rounded-2xl bg-muted p-4 ring-0 has-[>img:first-child]:pt-4 *:[img:first-child]:rounded-2xl lg:flex-row lg:items-center lg:gap-10 lg:rounded-3xl lg:p-8 lg:has-[>img:first-child]:pt-8",
				// Local group tile: inset image, header, stats and a divided footer link (see card-footer).
				group: "gap-4 rounded-2xl p-4 ring-0 [--card-spacing:0px] has-[>img:first-child]:pt-4 lg:p-6 lg:has-[>img:first-child]:pt-6",
				timeline: "gap-0 rounded-xl py-0 ring-0 [--card-spacing:--spacing(4)] *:data-[slot=card-content]:py-4 *:[img:first-child]:rounded-none lg:flex-row lg:items-start lg:gap-4 lg:overflow-visible lg:rounded-none lg:bg-transparent lg:[--card-spacing:--spacing(2)] lg:*:data-[slot=card-content]:py-3 lg:*:[img:first-child]:rounded-xl",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	});

	export type CardVariant = VariantProps<typeof cardVariants>["variant"];
</script>

<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		size = "default",
		variant = "default",
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		size?: "default" | "sm";
		variant?: CardVariant;
	} = $props();
</script>

<div
	bind:this={ref}
	data-slot="card"
	data-size={size}
	data-variant={variant}
	class={cn(cardVariants({ variant }), className)}
	{...restProps}
>
	{@render children?.()}
</div>

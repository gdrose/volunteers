<script lang="ts" module>
	import { type VariantProps, tv } from "tailwind-variants";

	export const cardVariants = tv({
		base: "ring-foreground/10 bg-card text-card-foreground gap-(--card-spacing) overflow-hidden rounded-2xl py-(--card-spacing) text-sm ring-1 [--card-spacing:--spacing(6)] has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(4)] *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl group/card flex flex-col",
		variants: {
			variant: {
				default: "",
				// Stacked media card on mobile; transparent media row (image beside text) on desktop.
				// Bordered info card; title/description/footer typography keyed off data-variant.
				contact: "gap-3.5 rounded-[20px] [--card-spacing:--spacing(5)] lg:gap-[18px] lg:rounded-[24px] lg:[--card-spacing:--spacing(7)]",
				// Centered call-to-action panel; children sit directly in the card.
				callout: "items-center gap-3.5 rounded-[20px] bg-muted px-(--card-spacing) text-center [--card-spacing:--spacing(5)] lg:gap-4 lg:rounded-[24px] lg:[--card-spacing:--spacing(10)]",
				timeline: "gap-0 rounded-[16px] py-0 ring-0 [--card-spacing:--spacing(4)] *:data-[slot=card-content]:py-4 *:[img:first-child]:rounded-none lg:flex-row lg:items-start lg:gap-4 lg:overflow-visible lg:rounded-none lg:bg-transparent lg:[--card-spacing:--spacing(2)] lg:*:data-[slot=card-content]:py-3 lg:*:[img:first-child]:rounded-[16px]",
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

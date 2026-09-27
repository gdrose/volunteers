<script lang="ts" module>
	import { type VariantProps, tv } from "tailwind-variants";

	export const tooltipVariants = tv({
		slots: {
			content:
				"data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 inline-flex items-center gap-1.5 rounded-2xl px-3 py-1.5 text-caption has-data-[slot=kbd]:pr-1.5 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-4xl z-50 w-fit max-w-xs origin-(--bits-tooltip-content-transform-origin)",
			arrow:
				"size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] data-[side=left]:translate-x-[-1.5px] data-[side=right]:translate-x-[1.5px] z-50 data-[side=bottom]:-translate-x-1/2 data-[side=bottom]:-translate-y-[calc(-50%_+_1px)] data-[side=left]:-translate-y-[calc(50%_-_3px)] data-[side=right]:translate-x-[calc(50%_+_2px)] data-[side=right]:translate-y-1/2 data-[side=top]:translate-x-1/2 data-[side=top]:translate-y-[calc(-50%_+_2px)]",
		},
		variants: {
			variant: {
				default: {
					content: "bg-foreground text-background",
					arrow: "bg-foreground fill-foreground",
				},
				destructive: {
					content: "bg-destructive font-medium text-white",
					arrow: "bg-destructive fill-destructive",
				},
			},
		},
		defaultVariants: {
			variant: "default",
		},
	});

	export type TooltipVariant = VariantProps<typeof tooltipVariants>["variant"];
</script>

<script lang="ts">
	import { Tooltip as TooltipPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";
	import type { WithoutChildrenOrChild } from "$lib/utils.js";
	import TooltipPortal from "./tooltip-portal.svelte";
	import type { ComponentProps } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		sideOffset = 0,
		side = "top",
		variant = "default",
		children,
		arrowClasses,
		portalProps,
		...restProps
	}: TooltipPrimitive.ContentProps & {
		variant?: TooltipVariant;
		arrowClasses?: string;
		portalProps?: WithoutChildrenOrChild<ComponentProps<typeof TooltipPortal>>;
	} = $props();

	const styles = $derived(tooltipVariants({ variant }));
</script>

<TooltipPortal {...portalProps}>
	<TooltipPrimitive.Content
		bind:ref
		data-slot="tooltip-content"
		{sideOffset}
		{side}
		class={cn(styles.content(), className)}
		{...restProps}
	>
		{@render children?.()}
		<TooltipPrimitive.Arrow>
			{#snippet child({ props })}
				<div class={cn(styles.arrow(), arrowClasses)} {...props}></div>
			{/snippet}
		</TooltipPrimitive.Arrow>
	</TooltipPrimitive.Content>
</TooltipPortal>

<script lang="ts" module>
	import { tv, type VariantProps } from "tailwind-variants";

	export const itemVariants = tv({
		base: "[a]:hover:bg-muted rounded-2xl border text-small group/item flex w-full flex-wrap items-center transition-colors duration-100 outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [a]:transition-colors",
		variants: {
			variant: {
				default: "border-transparent",
				outline: "border-border",
				muted: "bg-muted/50 border-transparent",
				divided: "rounded-none border-x-0 border-t-0 border-b-border lg:last:border-b-0",
			},
			size: {
				default: "gap-3.5 px-4 py-3.5",
				sm: "gap-3.5 px-3.5 py-3",
				xs: "gap-2.5 px-3 py-2.5 in-data-[slot=dropdown-menu-content]:p-0",
				resource: "gap-3 rounded-[16px] p-3 lg:h-40 lg:gap-4 lg:p-5",
				// Summary row with a full-width action below on mobile; single row on desktop.
				document: "gap-x-3 gap-y-3.5 p-4 *:data-[slot=item-actions]:basis-full lg:flex-nowrap lg:gap-5 lg:px-6 lg:py-5 lg:*:data-[slot=item-actions]:basis-auto",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	});

	export type ItemSize = VariantProps<typeof itemVariants>["size"];
	export type ItemVariant = VariantProps<typeof itemVariants>["variant"];
</script>

<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		child,
		variant,
		size,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		child?: Snippet<[{ props: Record<string, unknown> }]>;
		variant?: ItemVariant;
		size?: ItemSize;
	} = $props();

	const mergedProps = $derived({
		class: cn(itemVariants({ variant, size }), className),
		"data-slot": "item",
		"data-variant": variant,
		"data-size": size,
		...restProps,
	});
</script>

{#if child}
	{@render child({ props: mergedProps })}
{:else}
	<div bind:this={ref} {...mergedProps}>
		{@render mergedProps.children?.()}
	</div>
{/if}

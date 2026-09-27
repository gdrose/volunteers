<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="card-footer"
	class={cn("rounded-b-xl px-(--card-spacing) [.border-t]:pt-(--card-spacing) flex items-center group-data-[variant=contact]/card:text-small group-data-[variant=contact]/card:font-bold group-data-[variant=group]/card:border-t group-data-[variant=group]/card:pt-4 lg:group-data-[variant=group]/card:border-t-0 lg:group-data-[variant=group]/card:pt-2", className)}
	{...restProps}
>
	{@render children?.()}
</div>

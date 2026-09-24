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
	class={cn("rounded-b-xl px-(--card-spacing) [.border-t]:pt-(--card-spacing) flex items-center group-data-[variant=contact]/card:text-[13px] group-data-[variant=contact]/card:font-bold group-data-[variant=contact]/card:leading-normal lg:group-data-[variant=contact]/card:text-sm", className)}
	{...restProps}
>
	{@render children?.()}
</div>

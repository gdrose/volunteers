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
	data-slot="item-title"
	class={cn("gap-2 text-sm leading-snug font-medium underline-offset-4 line-clamp-1 flex w-fit items-center group-data-[size=document]/item:text-base group-data-[size=document]/item:leading-normal group-data-[size=document]/item:font-extrabold group-data-[size=document]/item:text-foreground lg:group-data-[size=document]/item:text-lg group-data-[size=resource]/item:line-clamp-none group-data-[size=resource]/item:text-sm group-data-[size=resource]/item:leading-[18px] group-data-[size=resource]/item:font-extrabold group-data-[size=resource]/item:text-foreground lg:group-data-[size=resource]/item:text-[15px] lg:group-data-[size=resource]/item:leading-normal", className)}
	{...restProps}
>
	{@render children?.()}
</div>

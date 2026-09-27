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
	class={cn("gap-2 text-small font-medium underline-offset-4 line-clamp-1 flex w-fit items-center group-data-[size=document]/item:text-h4 group-data-[size=document]/item:text-foreground group-data-[size=resource]/item:line-clamp-none group-data-[size=resource]/item:text-body group-data-[size=resource]/item:font-extrabold group-data-[size=resource]/item:text-foreground", className)}
	{...restProps}
>
	{@render children?.()}
</div>

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
	role="list"
	data-slot="item-group"
	class={cn("gap-4 has-data-[size=sm]:gap-2.5 has-data-[size=xs]:gap-2 has-data-[size=document]:gap-0 has-data-[size=document]:overflow-hidden has-data-[size=document]:rounded-xl lg:has-data-[size=document]:rounded-3xl lg:has-data-[size=document]:border has-data-[size=partner]:rounded-2xl has-data-[size=partner]:border has-data-[size=partner]:p-5 lg:has-data-[size=partner]:flex-row lg:has-data-[size=partner]:items-center lg:has-data-[size=partner]:justify-center lg:has-data-[size=partner]:gap-10 lg:has-data-[size=partner]:px-10 lg:has-data-[size=partner]:py-8 group/item-group flex w-full flex-col", className)}
	{...restProps}
>
	{@render children?.()}
</div>

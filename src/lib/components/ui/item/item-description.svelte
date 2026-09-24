<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLParagraphElement>> = $props();
</script>

<p
	bind:this={ref}
	data-slot="item-description"
	class={cn(
		"text-muted-foreground text-left text-sm line-clamp-2 font-normal group-data-[size=document]/item:text-xs group-data-[size=document]/item:leading-normal lg:group-data-[size=document]/item:text-[13px] group-data-[size=resource]/item:text-xs group-data-[size=resource]/item:leading-4 lg:group-data-[size=resource]/item:text-[13px] lg:group-data-[size=resource]/item:leading-normal [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</p>

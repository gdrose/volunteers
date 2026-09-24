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
	data-slot="card-title"
	class={cn("text-h4 text-foreground group-data-[variant=contact]/card:text-h3 group-data-[variant=project]/card:text-h3 group-data-[variant=post]/card:text-h3 group-data-[variant=callout]/card:text-h2", className)}
	{...restProps}
>
	{@render children?.()}
</div>

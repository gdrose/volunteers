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
	data-slot="card-description"
	class={cn("text-muted-foreground text-body group-data-[variant=project]/card:text-small lg:group-data-[variant=project]/card:font-medium lg:group-data-[variant=project]/card:text-foreground", className)}
	{...restProps}
>
	{@render children?.()}
</p>

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
	class={cn("text-muted-foreground text-sm group-data-[variant=contact]/card:leading-5 lg:group-data-[variant=contact]/card:text-[15px] lg:group-data-[variant=contact]/card:leading-normal group-data-[variant=callout]/card:text-[13px] group-data-[variant=callout]/card:leading-[18px] lg:group-data-[variant=callout]/card:text-[15px] lg:group-data-[variant=callout]/card:leading-6", className)}
	{...restProps}
>
	{@render children?.()}
</p>

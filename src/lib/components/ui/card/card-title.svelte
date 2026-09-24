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
	class={cn("text-base font-medium group-data-[variant=contact]/card:text-xl group-data-[variant=contact]/card:leading-normal group-data-[variant=contact]/card:font-black group-data-[variant=contact]/card:text-foreground lg:group-data-[variant=contact]/card:text-2xl group-data-[variant=callout]/card:text-xl group-data-[variant=callout]/card:leading-normal group-data-[variant=callout]/card:font-extrabold group-data-[variant=callout]/card:text-foreground lg:group-data-[variant=callout]/card:text-[28px] lg:group-data-[variant=callout]/card:leading-9", className)}
	{...restProps}
>
	{@render children?.()}
</div>

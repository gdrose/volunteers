<script lang="ts">
	import { Label } from "$lib/components/ui/label/index.js";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		children,
		required = false,
		...restProps
	}: ComponentProps<typeof Label> & {
		/** Shows the required marker; the control itself still carries `required`. */
		required?: boolean;
	} = $props();
</script>

<Label
	bind:ref
	data-slot="field-label"
	class={cn(
		"has-data-checked:bg-primary/5 has-data-checked:border-primary/30 dark:has-data-checked:border-primary/20 dark:has-data-checked:bg-primary/10 gap-2 group-data-[disabled=true]/field:opacity-50 has-[>[data-slot=field]]:rounded-xl has-[>[data-slot=field]]:border has-[>[data-slot=field]]:not-has-[:disabled,[data-disabled]]:hover:bg-input/40 has-[>[data-slot=field]]:has-[:focus-visible]:border-ring has-[>[data-slot=field]]:has-[:focus-visible]:ring-ring has-[>[data-slot=field]]:has-[:focus-visible]:ring-[3px] *:data-[slot=field]:p-4 group/field-label peer/field-label flex w-fit",
		"has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col",
		className
	)}
	{...restProps}
>
	{@render children?.()}
	{#if required}
		<span class="text-destructive" aria-hidden="true">*</span>
	{/if}
</Label>

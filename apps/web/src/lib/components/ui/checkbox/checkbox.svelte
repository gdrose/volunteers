<script lang="ts" module>
	import { type VariantProps, tv } from "tailwind-variants";

	export const checkboxVariants = tv({
		base: "aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 flex size-4 items-center justify-center rounded-sm border transition-shadow group-has-disabled/field:opacity-50 focus-visible:ring-[3px] aria-invalid:ring-[3px] group-has-[:focus-visible]/field-label:ring-0 peer relative shrink-0 outline-none after:absolute after:-inset-x-3 after:-inset-y-2 disabled:cursor-not-allowed disabled:opacity-50",
		variants: {
			variant: {
				default: "border-input dark:bg-input/30 data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary data-checked:border-primary aria-invalid:aria-checked:border-primary focus-visible:border-ring group-has-[:focus-visible]/field-label:not-data-checked:border-input group-has-[:focus-visible]/field-label:data-checked:border-primary",
				// For use on a `bg-primary` surface, paired with the inverse Input/Button.
				inverse: "border-primary-foreground bg-transparent data-checked:bg-primary-foreground data-checked:text-primary focus-visible:ring-primary-foreground focus-visible:ring-offset-primary aria-invalid:bg-primary-foreground aria-invalid:ring-destructive/60",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	});

	export type CheckboxVariant = VariantProps<typeof checkboxVariants>["variant"];
</script>

<script lang="ts">
	import { Checkbox as CheckboxPrimitive } from "bits-ui";
	import CheckIcon from '@lucide/svelte/icons/check';
	import MinusIcon from '@lucide/svelte/icons/minus';
	import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		checked = $bindable(false),
		indeterminate = $bindable(false),
		class: className,
		variant = "default",
		...restProps
	}: WithoutChildrenOrChild<CheckboxPrimitive.RootProps> & {
		variant?: CheckboxVariant;
	} = $props();
</script>

<CheckboxPrimitive.Root
	bind:ref
	data-slot="checkbox"
	class={cn(checkboxVariants({ variant }), className)}
	bind:checked
	bind:indeterminate
	{...restProps}
>
	{#snippet children({ checked, indeterminate })}
		<div
			data-slot="checkbox-indicator"
			class="[&>svg]:size-3.5 grid place-content-center text-current transition-none"
		>
			{#if checked}
				<CheckIcon />
			{:else if indeterminate}
				<MinusIcon />
			{/if}
		</div>
	{/snippet}
</CheckboxPrimitive.Root>

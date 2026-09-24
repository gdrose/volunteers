<script lang="ts" module>
	import { type VariantProps, tv } from "tailwind-variants";

	export const inputVariants = tv({
		base: "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 rounded-4xl border transition-colors file:h-7 file:text-sm file:font-medium focus-visible:ring-[3px] aria-invalid:ring-[3px] w-full min-w-0 outline-none file:inline-flex file:border-0 file:bg-transparent file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
		variants: {
			variant: {
				default: "bg-input/30 border-input",
				inverse: "border-transparent bg-primary-foreground text-foreground focus-visible:border-foreground focus-visible:ring-primary-foreground/50",
			},
			size: {
				default: "h-9 px-3 py-1 text-base md:text-sm",
				form: "h-10 px-4 text-[13px] lg:h-7.5 lg:px-2.5 lg:text-[10px] lg:font-semibold lg:tracking-[-0.02em] lg:placeholder:text-muted-foreground/60",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	});

	export type InputVariant = VariantProps<typeof inputVariants>["variant"];
	export type InputSize = VariantProps<typeof inputVariants>["size"];
</script>

<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLInputAttributes, HTMLInputTypeAttribute } from "svelte/elements";

	type InputType = Exclude<HTMLInputTypeAttribute, "file">;

	type Props = WithElementRef<
		Omit<HTMLInputAttributes, "type" | "size"> &
			({ type: "file"; files?: FileList } | { type?: InputType; files?: undefined })
	> & {
		variant?: InputVariant;
		size?: InputSize;
	};

	let {
		ref = $bindable(null),
		value = $bindable(),
		type,
		files = $bindable(),
		class: className,
		variant = "default",
		size = "default",
		"data-slot": dataSlot = "input",
		...restProps
	}: Props = $props();
</script>

{#if type === "file"}
	<input
		bind:this={ref}
		data-slot={dataSlot}
		class={cn(inputVariants({ variant, size }), className)}
		type="file"
		bind:files
		bind:value
		{...restProps}
	/>
{:else}
	<input
		bind:this={ref}
		data-slot={dataSlot}
		class={cn(inputVariants({ variant, size }), className)}
		{type}
		bind:value
		{...restProps}
	/>
{/if}

<script lang="ts" module>
	import { type VariantProps, tv } from "tailwind-variants";
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";

	export const buttonVariants = tv({
		base: "focus-visible:border-ring focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 rounded-4xl border border-transparent bg-clip-padding text-small font-medium focus-visible:ring-[3px] aria-invalid:ring-[3px] active:not-aria-[haspopup]:translate-y-px [&_svg:not([class*='size-'])]:size-4 group/button inline-flex shrink-0 items-center justify-center whitespace-nowrap transition-all outline-none select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground hover:bg-primary/80",
				outline: "border-foreground bg-background hover:bg-accent hover:text-accent-foreground aria-expanded:bg-muted aria-expanded:text-foreground",
				"outline-strong": "border-2 border-foreground bg-background text-foreground hover:bg-foreground hover:text-background",
				secondary: "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
				ghost: "hover:bg-muted hover:text-foreground dark:hover:bg-muted/50 aria-expanded:bg-muted aria-expanded:text-foreground",
				destructive: "bg-destructive/10 hover:bg-destructive/20 focus-visible:ring-destructive dark:bg-destructive/20 text-destructive focus-visible:border-destructive/40 dark:hover:bg-destructive/30",
				link: "text-primary underline-offset-4 hover:underline",
				soft: "bg-primary/10 text-primary hover:bg-primary/15 aria-expanded:bg-primary/15",
				// Round control floating on imagery (mobile); a muted chip on desktop.
				overlay: "bg-background/95 text-foreground hover:bg-background lg:border-border lg:bg-muted lg:hover:bg-secondary",
				inverse: "border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground/10 focus-visible:border-primary-foreground focus-visible:ring-primary-foreground focus-visible:ring-offset-primary lg:border-transparent lg:bg-primary-foreground lg:text-black lg:hover:bg-primary-foreground/90",
			},
			size: {
				// Three heights on the 8px rhythm (32 / 40 / 48), plus matching square icon buttons.
				sm: "h-8 gap-1 px-3 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
				default: "h-10 gap-1.5 px-4 text-body font-bold has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
				// Page-level calls to action.
				lg: "h-12 gap-2 px-6 text-body font-extrabold has-data-[icon=inline-end]:pr-5 has-data-[icon=inline-start]:pl-5 lg:px-8",
				"icon-sm": "size-8",
				icon: "size-10",
				"icon-lg": "size-12",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	});

	export type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];
	export type ButtonSize = VariantProps<typeof buttonVariants>["size"];

	export type ButtonProps = WithElementRef<HTMLButtonAttributes> &
		WithElementRef<HTMLAnchorAttributes> & {
			variant?: ButtonVariant;
			size?: ButtonSize;
		};
</script>

<script lang="ts">
	let {
		class: className,
		variant = "default",
		size = "default",
		ref = $bindable(null),
		href = undefined,
		type = "button",
		disabled,
		children,
		...restProps
	}: ButtonProps = $props();
</script>

{#if href}
	<a
		bind:this={ref}
		data-slot="button"
		class={cn(buttonVariants({ variant, size }), className)}
		href={disabled ? undefined : href}
		aria-disabled={disabled}
		role={disabled ? "link" : undefined}
		tabindex={disabled ? -1 : undefined}
		{...restProps}
	>
		{@render children?.()}
	</a>
{:else}
	<button
		bind:this={ref}
		data-slot="button"
		class={cn(buttonVariants({ variant, size }), className)}
		{type}
		{disabled}
		{...restProps}
	>
		{@render children?.()}
	</button>
{/if}

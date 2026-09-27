<script lang="ts" module>
	import { type VariantProps, tv } from "tailwind-variants";

	export const dialogContentVariants = tv({
		base: "bg-popover text-popover-foreground data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 ring-foreground/5 grid max-w-[calc(100%_-_2rem)] gap-6 rounded-4xl p-6 text-small ring-1 duration-100 sm:max-w-md fixed top-1/2 left-1/2 z-50 w-full -translate-x-1/2 -translate-y-1/2 outline-none",
		variants: {
			variant: {
				default: "",
				// Media panel: image on top (mobile) or on the left (desktop), content beside it.
				media: "flex max-h-[calc(100dvh-2rem)] flex-col gap-0 overflow-y-auto rounded-3xl p-0 ring-0 shadow-[0_20px_60px_rgba(17,24,39,0.2)] lg:max-h-[calc(100dvh-4rem)] lg:max-w-228 lg:flex-row lg:overflow-hidden",
				// Full-screen photo viewer on a dark backdrop; clicking the backdrop closes it.
				lightbox: "inset-0 flex h-dvh w-full max-w-none translate-x-0 translate-y-0 flex-col gap-0 cursor-zoom-out rounded-none bg-black p-0 text-white ring-0 sm:max-w-none data-open:zoom-in-100 data-closed:zoom-out-100",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	});

	export type DialogContentVariant = VariantProps<typeof dialogContentVariants>["variant"];
</script>

<script lang="ts">
	import { Dialog as DialogPrimitive } from "bits-ui";
	import XIcon from '@lucide/svelte/icons/x';
	import { Button } from "$lib/components/ui/button/index.js";
	import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";
	import * as Dialog from "./index.js";
	import DialogPortal from "./dialog-portal.svelte";
	import type { Snippet } from "svelte";
	import type { ComponentProps } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		portalProps,
		children,
		showCloseButton = true,
		variant = "default",
		...restProps
	}: WithoutChildrenOrChild<DialogPrimitive.ContentProps> & {
		portalProps?: WithoutChildrenOrChild<ComponentProps<typeof DialogPortal>>;
		children: Snippet;
		showCloseButton?: boolean;
		variant?: DialogContentVariant;
	} = $props();
</script>

<DialogPortal {...portalProps}>
	<Dialog.Overlay />
	<DialogPrimitive.Content
		bind:ref
		data-slot="dialog-content"
		class={cn(dialogContentVariants({ variant }), className)}
		{...restProps}
	>
		{@render children?.()}
		{#if showCloseButton}
			<DialogPrimitive.Close data-slot="dialog-close">
				{#snippet child({ props })}
					<Button variant="ghost" class="absolute top-4 right-4" size="icon-sm" {...props}>
						<XIcon  />
						<span class="sr-only">Close</span>
					</Button>
				{/snippet}
			</DialogPrimitive.Close>
		{/if}
	</DialogPrimitive.Content>
</DialogPortal>

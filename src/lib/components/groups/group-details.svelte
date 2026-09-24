<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import closeIcon from '$lib/assets/groups/close.svg';
	import mailIcon from '$lib/assets/groups/mail.svg';
	import { m } from '$lib/paraglide/messages.js';
	import { groupArea, groupEmail, type LocalGroup } from './groups';

	type Props = {
		/** The group to show; the dialog is open while this is set. */
		group: LocalGroup | undefined;
		onClose: () => void;
	};

	let { group, onClose }: Props = $props();

	// Keep the last group rendered while the dialog animates closed.
	let shown = $state<LocalGroup>();
	let content = $state<HTMLElement | null>(null);
	$effect(() => {
		if (group) shown = group;
	});
</script>

<Dialog.Root open={!!group} onOpenChange={(open) => !open && onClose()}>
	{#if shown}
		{@const location = `${shown.city} · ${groupArea(shown)}`}
		{@const email = groupEmail(shown)}
		<Dialog.Content
			variant="media"
			showCloseButton={false}
			onOpenAutoFocus={(event) => {
				// Focus the dialog itself rather than its first link, so no focus ring flashes on open.
				event.preventDefault();
				content?.focus();
			}}
			bind:ref={content}
		>
			{#if shown.featured}
				<div class="relative h-52.5 shrink-0 lg:h-auto lg:min-h-142.5 lg:w-107.5">
					<img src={shown.featured.image} alt="" class="absolute inset-0 size-full object-cover" />
					<Badge
						variant="overlay"
						size="pill"
						class="absolute bottom-3.5 left-4 lg:top-8 lg:bottom-auto lg:left-8"
					>
						{location}
					</Badge>
				</div>
			{/if}

			<div class="flex flex-col gap-4 px-5 pt-5.5 pb-5 lg:min-w-0 lg:flex-1 lg:gap-6 lg:p-10">
				{#if !shown.featured}
					<Badge variant="secondary" size="pill" class="self-start">{location}</Badge>
				{/if}
				<Dialog.Title class="lg:pr-14">Volunteers {shown.city}</Dialog.Title>
				{#if shown.description}
					<Dialog.Description>{shown.description()}</Dialog.Description>
				{/if}

				{#if shown.featured}
					<dl class="grid grid-cols-2 gap-2 lg:gap-3">
						<div
							class="flex flex-col gap-0.5 rounded-lg bg-muted p-3 lg:gap-1 lg:rounded-2xl lg:p-4"
						>
							<dt class="order-last text-caption text-muted-foreground">
								{m.find_group_volunteers()}
							</dt>
							<dd class="text-h3 font-black text-foreground">{shown.featured.volunteers}</dd>
						</div>
						<div
							class="flex flex-col gap-0.5 rounded-lg bg-muted p-3 lg:gap-1 lg:rounded-2xl lg:p-4"
						>
							<dt class="order-last text-caption text-muted-foreground">
								{m.find_group_active_projects()}
							</dt>
							<dd class="text-h3 font-black text-foreground">{shown.featured.projects}</dd>
						</div>
					</dl>
				{/if}

				<!-- Mobile: below the join button, under a divider. Desktop: above it, with an icon chip. -->
				<div
					class="order-last flex flex-col gap-2.5 border-t pt-4 lg:order-none lg:border-t-0 lg:pt-0"
				>
					<p class="text-small font-extrabold text-foreground lg:sr-only">
						{m.find_group_contact_group()}
					</p>
					<a href="mailto:{email}" class="group flex items-center gap-2.5 lg:gap-3">
						<span
							class="flex shrink-0 items-center justify-center lg:size-9 lg:rounded-full lg:bg-primary/10"
						>
							<img src={mailIcon} alt="" width="18" height="18" />
						</span>
						<span class="flex min-w-0 flex-col gap-0.5">
							<span class="hidden text-caption font-bold text-muted-foreground uppercase lg:block">
								{m.find_group_email_label()}
							</span>
							<span
								class="truncate text-small font-semibold text-foreground group-hover:underline lg:text-body"
							>
								{email}
							</span>
						</span>
					</a>
				</div>

				{#if shown.whatsapp}
					<Button
						href={shown.whatsapp}
						target="_blank"
						rel="noopener noreferrer"
						size="cta-xl"
						class="w-full"
					>
						{m.find_group_join_whatsapp()}<span aria-hidden="true">→</span>
					</Button>
				{/if}
			</div>

			<Dialog.Close>
				{#snippet child({ props })}
					<Button
						{...props}
						variant="overlay"
						size="icon-lg"
						class="absolute top-4 right-4 lg:top-10 lg:right-10"
					>
						<img src={closeIcon} alt="" width="16" height="16" />
						<span class="sr-only">{m.find_group_close()}</span>
					</Button>
				{/snippet}
			</Dialog.Close>
		</Dialog.Content>
	{/if}
</Dialog.Root>

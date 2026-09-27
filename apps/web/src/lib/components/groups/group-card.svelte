<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { ArrowLink, SanityImage } from '$lib/components/shared';
	import { m } from '$lib/paraglide/messages.js';
	import { groupArea, type LocalGroup } from './groups';
	import { groupHref } from './group-selection.svelte';

	let { group }: { group: LocalGroup } = $props();
</script>

<Card.Root variant="group">
	{#if group.photo}
		<SanityImage
			image={group.photo}
			width={400}
			sizes="(min-width: 64rem) 340px, 100vw"
			alt=""
			loading="lazy"
			class="h-35 w-full rounded-lg object-cover lg:h-40"
		/>
	{/if}

	<Card.Content class="flex flex-col gap-4">
		<div class="flex flex-col gap-1">
			<p class="text-eyebrow text-primary uppercase">{groupArea(group)}</p>
			<Card.Title role="heading" aria-level={3}>Volunteers {group.city}</Card.Title>
		</div>

		<dl class="flex gap-6 lg:gap-4">
			<div class="flex flex-col gap-0.5">
				<dt class="text-caption text-muted-foreground uppercase">{m.find_group_volunteers()}</dt>
				<dd class="text-body font-bold text-foreground">{group.volunteerCount}</dd>
			</div>
			<div class="flex flex-col gap-0.5">
				<dt class="text-caption text-muted-foreground uppercase">
					{m.find_group_active_projects()}
				</dt>
				<dd class="text-body font-bold text-foreground">{group.projectCount}</dd>
			</div>
		</dl>
	</Card.Content>

	<Card.Footer>
		<!-- Opens the group details dialog on the find-a-group page. -->
		<ArrowLink href={groupHref(group)} data-sveltekit-noscroll>
			{m.find_group_contact_group()}
		</ArrowLink>
	</Card.Footer>
</Card.Root>

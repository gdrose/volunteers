<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { ArrowLink } from '$lib/components/shared';
	import { m } from '$lib/paraglide/messages.js';
	import { groupArea, type LocalGroup } from './groups';

	let { group }: { group: LocalGroup & { featured: NonNullable<LocalGroup['featured']> } } =
		$props();
</script>

<Card.Root variant="group">
	<img
		src={group.featured.image}
		alt=""
		loading="lazy"
		class="h-35 w-full rounded-lg object-cover lg:h-40"
	/>

	<Card.Content class="flex flex-col gap-4">
		<div class="flex flex-col gap-1">
			<p class="text-eyebrow text-primary uppercase">{groupArea(group)}</p>
			<Card.Title role="heading" aria-level={3}>Volunteers {group.city}</Card.Title>
		</div>

		<dl class="flex gap-6 lg:gap-4">
			<div class="flex flex-col gap-0.5">
				<dt class="text-caption text-muted-foreground uppercase">{m.find_group_volunteers()}</dt>
				<dd class="text-body font-bold text-foreground">{group.featured.volunteers}</dd>
			</div>
			<div class="flex flex-col gap-0.5">
				<dt class="text-caption text-muted-foreground uppercase">
					{m.find_group_active_projects()}
				</dt>
				<dd class="text-body font-bold text-foreground">{group.featured.projects}</dd>
			</div>
		</dl>
	</Card.Content>

	<Card.Footer>
		<!-- Opens the group details dialog on the find-a-group page. -->
		<ArrowLink href="?group={group.id}" data-sveltekit-noscroll>
			{m.find_group_contact_group()}
		</ArrowLink>
	</Card.Footer>
</Card.Root>

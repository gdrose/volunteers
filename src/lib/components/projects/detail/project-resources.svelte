<script lang="ts">
	import { Container } from '$lib/components/shared';
	import * as Item from '$lib/components/ui/item/index.js';
	import arrowRight from '$lib/assets/icons/arrow-right-primary.svg';
	import playIcon from '$lib/assets/icons/play.svg';
	import type { ProjectResource, ResourceKind } from '../project-details';
	import { m } from '$lib/paraglide/messages.js';

	let { resources }: { resources: ProjectResource[] } = $props();

	const actionLabel: Record<ResourceKind, () => string> = {
		book: m.project_resource_read,
		document: m.project_resource_download,
		video: m.project_resource_watch
	};
</script>

<section aria-labelledby="project-resources" class="w-full border-t">
	<Container class="flex flex-col gap-4 py-8 lg:gap-7 lg:py-14">
		<h2
			id="project-resources"
			class="text-center text-2xl leading-normal font-extrabold text-foreground lg:text-[28px] lg:leading-9"
		>
			{m.project_resources_title()}
		</h2>

		<Item.Group class="grid gap-3 lg:grid-cols-2 lg:gap-4">
			{#each resources as resource (resource.id)}
				<Item.Root role="listitem" variant="outline" size="resource">
					<Item.Media variant="thumbnail">
						<img src={resource.cover} alt="" loading="lazy" />
						{#if resource.kind === 'video'}
							<span
								class="absolute top-1/2 left-1/2 flex size-7 -translate-1/2 items-center justify-center rounded-full bg-white/90"
							>
								<img src={playIcon} alt="" width="12" height="12" />
							</span>
						{/if}
					</Item.Media>
					<Item.Content>
						<Item.Title role="heading" aria-level={3}>{resource.title()}</Item.Title>
						<Item.Description>
							<span class="lg:hidden">{resource.shortDescription()}</span>
							<span class="hidden lg:inline">{resource.description()}</span>
						</Item.Description>
						<span
							class="inline-flex items-center gap-1.5 text-xs leading-normal font-bold text-primary lg:text-[13px]"
						>
							{actionLabel[resource.kind]()}
							<img src={arrowRight} alt="" width="14" height="14" />
						</span>
					</Item.Content>
				</Item.Root>
			{/each}
		</Item.Group>
	</Container>
</section>

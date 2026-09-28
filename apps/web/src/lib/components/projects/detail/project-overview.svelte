<script lang="ts">
	import type { Pathname } from '$app/types';
	import { resolve } from '$app/paths';
	import { PortableText, type PortableTextComponents } from '@portabletext/svelte';
	import { Container, PhotoMosaic, PortableTextLink } from '$lib/components/shared';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { activityIcon, type ProjectDetail } from '../projects';
	import ProjectParagraph from './project-paragraph.svelte';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages.js';

	let { project }: { project: ProjectDetail } = $props();

	const components: Partial<PortableTextComponents> = {
		block: ProjectParagraph,
		marks: { link: PortableTextLink }
	};
</script>

<Container class="flex flex-col gap-8 pt-2 pb-10 lg:gap-12 lg:pt-8 lg:pb-14">
	<section aria-labelledby="project-intro" class="flex flex-col gap-4 pb-4 lg:gap-5 lg:pb-0">
		<h2 id="project-intro" class="text-h3 text-foreground">
			{project.intro}
		</h2>
		{#if project.body}
			<PortableText value={project.body} {components} />
		{/if}
	</section>

	<Separator />

	<section aria-labelledby="project-activities" class="flex flex-col gap-5 lg:gap-8">
		<h2 id="project-activities" class="text-h3 text-foreground">
			{m.project_activities_title()}
		</h2>

		{#if project.gallery?.length}
			<PhotoMosaic photos={project.gallery} title={project.title} />
		{/if}

		<ul
			class="flex flex-col gap-2 pt-2 lg:grid lg:grid-cols-[repeat(2,420px)] lg:justify-center lg:gap-3 lg:pt-0"
		>
			{#each project.activities ?? [] as activity (activity._key)}
				<li class="flex items-center gap-3 lg:p-3">
					<span
						class="flex size-5 shrink-0 items-center justify-center rounded-sm border border-primary bg-primary/10 lg:size-10 lg:rounded-lg lg:bg-background"
					>
						<img
							src={activityIcon(activity.icon)}
							alt=""
							width="22"
							height="22"
							class="size-3 lg:size-6"
						/>
					</span>
					<span class="text-small font-bold text-foreground">
						{activity.label}
					</span>
				</li>
			{/each}
		</ul>
	</section>

	<Separator class="hidden lg:block" />

	<Card.Root variant="callout">
		<Card.Title role="heading" aria-level={2}>{m.project_find_group_title()}</Card.Title>
		<Card.Description>{m.project_find_group_description()}</Card.Description>
		<Button href={resolve(localizeHref('/find-a-group') as Pathname)} size="lg">
			{m.nav_find_group()}<span aria-hidden="true">→</span>
		</Button>
	</Card.Root>
</Container>

<script lang="ts">
	import { PortableText, type PortableTextComponents } from '@portabletext/svelte';
	import { Container, PortableTextLink } from '$lib/components/shared';
	import { StatItem } from '$lib/components/stats';
	import type { ProjectDetail } from '../projects';
	import ProjectParagraph from './project-paragraph.svelte';
	import { m } from '$lib/paraglide/messages.js';

	/** The result after the problem (intro) and the process (activities). */
	let { project }: { project: ProjectDetail } = $props();

	const components: Partial<PortableTextComponents> = {
		block: ProjectParagraph,
		marks: { link: PortableTextLink }
	};
</script>

<section aria-labelledby="project-impact" class="w-full border-t">
	<Container class="flex flex-col gap-4 py-8 lg:gap-7 lg:py-14">
		<div class="flex flex-col gap-2 text-center">
			<h2 id="project-impact" class="text-h2 text-foreground">
				{m.project_impact_title()}
			</h2>
			{#if project.startedYear}
				<p class="text-small font-semibold text-muted-foreground">
					{m.project_impact_since({ year: String(project.startedYear) })}
				</p>
			{/if}
		</div>

		{#if project.impact?.length}
			<dl class="flex flex-col">
				{#each project.impact as figure (figure._key)}
					<StatItem value={figure.value} label={figure.label} description={figure.description} />
				{/each}
			</dl>
		{/if}

		{#if project.outcomes}
			<div class="flex flex-col gap-4">
				<PortableText value={project.outcomes} {components} />
			</div>
		{/if}
	</Container>
</section>

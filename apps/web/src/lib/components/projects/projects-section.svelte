<script lang="ts">
	import { Container } from '$lib/components/shared';
	import type { Pathname } from '$app/types';
	import { resolve } from '$app/paths';
	import { SectionTitle } from '$lib/components/shared';
	import ProjectCard from './project-card.svelte';
	import { projects } from './projects';
	import { getProjectDetail } from './project-details';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages.js';

	const projectsPath = resolve(localizeHref('/what-we-do') as Pathname);

	// Projects with a detail page link to it; the rest anchor into /what-we-do for now.
	const projectHref = (id: string) =>
		getProjectDetail(id)
			? resolve(localizeHref(`/what-we-do/${id}`) as Pathname)
			: `${projectsPath}#${id}`;
</script>

<section aria-labelledby="projects-title" class="w-full bg-muted lg:bg-background">
	<Container class="flex flex-col gap-6 py-10 lg:gap-4 lg:py-3">
		<SectionTitle id="projects-title">{m.projects_title()}</SectionTitle>

		<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-[19px]">
			{#each projects as project (project.id)}
				<ProjectCard
					title={project.title()}
					description={project.description()}
					image={project.image}
					imageClass={project.imageClass}
					href={projectHref(project.id)}
					linkLabel={m.projects_learn_more()}
				/>
			{/each}
		</div>
	</Container>
</section>

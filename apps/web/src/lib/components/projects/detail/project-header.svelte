<script lang="ts">
	import { Container, PageBreadcrumb } from '$lib/components/shared';
	import { cn } from '$lib/utils.js';
	import type { ProjectDetail } from '../project-details';

	let { project }: { project: ProjectDetail } = $props();
</script>

<header>
	<img
		src={project.header.src}
		alt={project.header.alt()}
		class={cn('h-60 w-full object-cover lg:h-[438px]', project.header.position)}
	/>
	<Container class="flex flex-col gap-3 pt-6 pb-7 lg:pt-8 lg:pb-4">
		<PageBreadcrumb crumbs={[{ label: project.name() }]} />
		<h1 class="text-h1 text-foreground">
			{project.titleStart()}
			<span class="text-primary">{project.titleHighlight()}</span>
		</h1>
		<p class="text-lead text-muted-foreground">
			{project.summary()}
		</p>
	</Container>
</header>

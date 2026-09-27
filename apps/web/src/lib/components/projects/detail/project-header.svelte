<script lang="ts">
	import { Container, PageBreadcrumb, SanityImage } from '$lib/components/shared';
	import type { ProjectDetail } from '../projects';

	let { project }: { project: ProjectDetail } = $props();
</script>

<header>
	{#if project.heroImage}
		<SanityImage
			image={project.heroImage}
			width={1920}
			fetchpriority="high"
			class="h-60 w-full object-cover lg:h-110"
		/>
	{/if}
	<Container class="flex flex-col gap-3 pt-6 pb-7 lg:pt-8 lg:pb-4">
		<PageBreadcrumb crumbs={[{ label: project.title }]} />
		<h1 class="text-h1 text-foreground">
			{project.headline}
			{#if project.headlineEmphasis}
				<span class="text-primary">{project.headlineEmphasis}</span>
			{/if}
		</h1>
		{#if project.summary}
			<p class="text-lead text-muted-foreground">
				{project.summary}
			</p>
		{/if}
	</Container>
</header>

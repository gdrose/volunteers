<script lang="ts">
	import {
		ProjectHeader,
		ProjectNews,
		ProjectOverview,
		ProjectPartners,
		ProjectResources
	} from '$lib/components/projects';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<main>
	<ProjectHeader project={data.project} />
	<ProjectOverview project={data.project} />
	<ProjectNews projectId={data.project.id} />
	<ProjectResources resources={data.project.resources} />
	<ProjectPartners partners={data.project.partners} />
</main>

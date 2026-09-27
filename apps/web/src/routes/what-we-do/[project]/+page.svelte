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
	<ProjectNews posts={data.news} />
	{#if data.project.resources?.length}
		<ProjectResources resources={data.project.resources} />
	{/if}
	{#if data.project.partners?.length}
		<ProjectPartners partners={data.project.partners} />
	{/if}
</main>

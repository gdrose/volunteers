<script lang="ts">
	import {
		ProjectHeader,
		ProjectImpact,
		ProjectNews,
		ProjectOverview,
		ProjectPartners,
		ProjectResources
	} from '$lib/components/projects';
	import { Seo } from '$lib/components/shared';
	import { urlFor } from '$lib/sanity/image';
	import { m } from '$lib/paraglide/messages.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Seo
	title={data.project.title}
	description={data.project.summary ?? m.what_we_do_description()}
	image={data.project.heroImage
		? urlFor(data.project.heroImage).width(1200).height(630).fit('crop').url()
		: undefined}
/>

<ProjectHeader project={data.project} />
<ProjectOverview project={data.project} />
<!-- Problem (overview) → process (activities) → result (impact) → depth (news, resources, partners). -->
{#if data.project.impact?.length || data.project.outcomes}
	<ProjectImpact project={data.project} />
{/if}
<ProjectNews posts={data.news} />
{#if data.project.resources?.length}
	<ProjectResources resources={data.project.resources} />
{/if}
{#if data.project.partners?.length}
	<ProjectPartners partners={data.project.partners} />
{/if}

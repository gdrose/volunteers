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
	import { translationPaths } from '$lib/components/shared/seo';
	import { shareImageUrl } from '$lib/sanity/image';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const shareImage = $derived(
		data.project.heroImage?.asset ? data.project.heroImage : data.project.coverImage
	);
</script>

<Seo
	title={data.project.title}
	description={data.project.summary || data.project.teaser}
	image={shareImageUrl(shareImage)}
	imageAlt={shareImage.alt ?? undefined}
	translations={translationPaths(data.project.translations, (slug) => `/what-we-do/${slug}`)}
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

<script lang="ts">
	import { Hero } from '$lib/components/hero';
	import { ProjectsSection } from '$lib/components/projects';
	import { StatsSection } from '$lib/components/stats';
	import { NewsletterSection } from '$lib/components/newsletter';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Hero />
<ProjectsSection projects={data.projects} />
<StatsSection stats={data.stats} />
<NewsletterSection />

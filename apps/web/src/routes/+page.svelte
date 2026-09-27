<script lang="ts">
	import { Hero } from '$lib/components/hero';
	import { ProjectsSection } from '$lib/components/projects';
	import { StatsSection } from '$lib/components/stats';
	import { NewsletterSection } from '$lib/components/newsletter';
	import { Seo } from '$lib/components/shared';
	import { m } from '$lib/paraglide/messages.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Seo description={m.hero_description()} />

<Hero socials={data.socials} />
<ProjectsSection projects={data.projects} />
<StatsSection stats={data.stats} asOf={data.statsAsOf} />
<NewsletterSection />

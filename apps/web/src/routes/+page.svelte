<script lang="ts">
	import { page } from '$app/state';
	import { Hero } from '$lib/components/hero';
	import { ProjectsSection } from '$lib/components/projects';
	import { StatsSection } from '$lib/components/stats';
	import { NewsletterSection } from '$lib/components/newsletter';
	import { JsonLd, Seo } from '$lib/components/shared';
	import { graph, organization, website } from '$lib/components/shared/schema';
	import { siteOrigin } from '$lib/site';
	import { m } from '$lib/paraglide/messages.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const origin = $derived(siteOrigin(page.url));
</script>

<Seo description={m.meta_home_description()} cms={data.seo} />
<!-- Who runs the site, for search engines' knowledge panels; Google reads it from the home page. -->
<JsonLd
	schema={graph(
		organization({
			origin,
			description: m.meta_home_description(),
			socials: data.socials,
			email: data.email,
			details: data.organization
		}),
		website(origin)
	)}
/>

<Hero socials={data.socials} />
<ProjectsSection projects={data.projects} />
<StatsSection stats={data.stats} asOf={data.statsAsOf} />
<NewsletterSection />

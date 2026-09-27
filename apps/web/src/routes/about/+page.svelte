<script lang="ts">
	import {
		AboutHero,
		ContactsSection,
		DocumentsSection,
		StoryTimeline
	} from '$lib/components/about';
	import { NewsletterSection } from '$lib/components/newsletter';
	import { Seo } from '$lib/components/shared';
	import { m } from '$lib/paraglide/messages.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Seo title={m.nav_about()} description={m.about_lead()} />

<AboutHero stats={data.stats} asOf={data.statsAsOf} />
{#if data.milestones.length}
	<StoryTimeline milestones={data.milestones} />
{/if}
<!-- Hidden until a document is uploaded in the Studio (About page → Documents). -->
{#if data.documents.length}
	<DocumentsSection documents={data.documents} />
{/if}
{#if data.offices.length}
	<ContactsSection offices={data.offices} />
{/if}
<NewsletterSection />

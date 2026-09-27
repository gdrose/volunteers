<script lang="ts">
	import { PageLayout, Seo } from '$lib/components/shared';
	import {
		DelegationCallout,
		GroupDetails,
		GroupFinder,
		GroupsDirectory
	} from '$lib/components/groups';
	import { NewsletterSection } from '$lib/components/newsletter';
	import { m } from '$lib/paraglide/messages.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Seo title={m.nav_find_group()} description={m.find_group_description()} />

<PageLayout crumbs={[{ label: m.nav_find_group() }]} description={m.find_group_description()}>
	{#snippet title()}
		{m.find_group_title_before()}<span class="text-primary">{m.find_group_title_highlight()}</span>
	{/snippet}

	<GroupFinder groups={data.groups} />
	<GroupsDirectory groups={data.groups} />
	<DelegationCallout />
	<NewsletterSection />
</PageLayout>

<GroupDetails groups={data.groups} />

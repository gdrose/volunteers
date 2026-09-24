<script lang="ts">
	import type { Pathname, ResolvedPathname } from '$app/types';
	import { resolve } from '$app/paths';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { PageLayout } from '$lib/components/shared';
	import {
		GroupCard,
		GroupDetails,
		GroupSearch,
		GroupsMap,
		featuredGroups,
		findGroup,
		type LocalGroup
	} from '$lib/components/groups';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages.js';

	let map = $state<ReturnType<typeof GroupsMap>>();

	const contactHref = resolve(localizeHref('/contact') as Pathname);

	// The open group lives in the URL (`?group=milano`) so the dialog can be linked to.
	const selectedGroup = $derived(findGroup(page.url.searchParams.get('group')));

	function setGroup(group: LocalGroup | undefined) {
		const path = resolve(localizeHref('/find-a-group') as Pathname);
		const search = group ? `?group=${group.id}` : '';
		goto(`${path}${search}` as ResolvedPathname, {
			noScroll: true,
			keepFocus: true,
			replaceState: true
		});
	}
</script>

<PageLayout crumbs={[{ label: m.nav_find_group() }]} description={m.find_group_description()}>
	{#snippet title()}
		{m.find_group_title_before()}<span class="text-primary">{m.find_group_title_highlight()}</span>
	{/snippet}

	<Button href={contactHref} variant="outline" size="xl" class="w-full lg:hidden">
		{m.find_group_contact_us()}
	</Button>

	<section
		aria-labelledby="find-group-search"
		class="flex flex-col gap-4 rounded-2xl border bg-muted p-5 lg:gap-8 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0"
	>
		<h2 id="find-group-search" class="text-h4 text-foreground lg:sr-only">
			{m.find_group_search_title()}
		</h2>
		<ul
			class="order-last flex list-inside list-disc flex-col gap-1.5 text-small font-medium text-muted-foreground lg:order-none lg:gap-2 lg:font-normal"
		>
			<li>{m.find_group_stat_italy()}</li>
			<li>{m.find_group_stat_abroad()}</li>
		</ul>
		<GroupSearch
			onSelect={(group) => {
				map?.focusGroup(group);
				setGroup(group);
			}}
		/>
	</section>

	<GroupsMap bind:this={map} onSelect={setGroup} />

	<section aria-labelledby="find-group-directory" class="flex flex-col gap-6 lg:gap-8">
		<h2 id="find-group-directory" class="text-h2 text-foreground">
			{m.find_group_directory_title()}
		</h2>
		<ul class="grid gap-4 lg:grid-cols-3 lg:gap-6">
			{#each featuredGroups as group (group.id)}
				{#if group.featured}
					<li><GroupCard group={{ ...group, featured: group.featured }} /></li>
				{/if}
			{/each}
		</ul>
	</section>

	<Card.Root variant="callout">
		<Card.Title role="heading" aria-level={2}>{m.find_group_cta_title()}</Card.Title>
		<Card.Description class="max-w-150">{m.find_group_cta_description()}</Card.Description>
		<Button href={contactHref} size="cta-xl" class="w-full lg:w-auto">
			{m.find_group_cta_button()}<span aria-hidden="true">→</span>
		</Button>
	</Card.Root>
</PageLayout>

<GroupDetails group={selectedGroup} onClose={() => setGroup(undefined)} />

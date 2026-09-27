<script lang="ts">
	import type { Pathname } from '$app/types';
	import { resolve } from '$app/paths';
	import { Button } from '$lib/components/ui/button/index.js';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages.js';
	import GroupSearch from './group-search.svelte';
	import GroupsMap from './groups-map.svelte';
	import { showGroup } from './group-selection.svelte';
	import type { LocalGroup } from './groups';

	let { groups }: { groups: LocalGroup[] } = $props();

	let map = $state<ReturnType<typeof GroupsMap>>();
</script>

<!-- Search and map: picking a result (or a marker) zooms the map and opens the group's details. -->
<div class="flex flex-col gap-8 lg:gap-12">
	<Button
		href={resolve(localizeHref('/contact') as Pathname)}
		variant="outline"
		size="xl"
		class="w-full lg:hidden"
	>
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
			{groups}
			onSelect={(group) => {
				map?.focusGroup(group);
				showGroup(group);
			}}
		/>
	</section>

	<GroupsMap bind:this={map} {groups} onSelect={showGroup} />
</div>

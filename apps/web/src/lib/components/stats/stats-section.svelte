<script lang="ts">
	import { Container } from '$lib/components/shared';
	import type { Pathname } from '$app/types';
	import { resolve } from '$app/paths';
	import { Button } from '$lib/components/ui/button/index.js';
	import StatItem from './stat-item.svelte';
	import { formatStatsDate, type Stat } from './stats';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages.js';

	let { stats, asOf }: { stats: Stat[]; asOf?: string | null } = $props();
</script>

<section aria-labelledby="stats-title" class="w-full bg-background lg:bg-muted">
	<Container class="flex flex-col gap-7 py-10 lg:gap-2 lg:pt-9 lg:pb-20">
		<div class="flex flex-col gap-5 lg:gap-3">
			<h2 id="stats-title" class="text-h1 text-foreground">
				{m.stats_title()}
				<span class="text-primary italic">{m.stats_title_highlight()}</span>
			</h2>
			<p class="text-body text-muted-foreground lg:text-foreground">
				{m.stats_description()}
			</p>
		</div>

		<dl class="flex flex-col gap-3.5 lg:gap-4">
			{#each stats as stat (stat._key)}
				<StatItem value={stat.value} label={stat.label} description={stat.description} />
			{/each}
		</dl>
		{#if asOf}
			<p class="text-caption text-muted-foreground">
				{m.stats_as_of({ date: formatStatsDate(asOf) })}
			</p>
		{/if}

		<Button href={resolve(localizeHref('/find-a-group') as Pathname)} class="w-full lg:hidden">
			{m.nav_find_group()}
		</Button>
	</Container>
</section>

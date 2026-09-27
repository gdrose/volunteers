<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';
	import GroupCard from './group-card.svelte';
	import { featuredGroups } from './groups';
</script>

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

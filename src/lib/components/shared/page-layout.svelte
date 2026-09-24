<script lang="ts">
	import type { Snippet } from 'svelte';
	import Container from './container.svelte';
	import PageBreadcrumb, { type Crumb } from './page-breadcrumb.svelte';

	type Props = {
		/** Trail after "Home"; the last crumb is the current page. */
		crumbs: Crumb[];
		title: Snippet;
		description?: string;
		children: Snippet;
		class?: string;
	};

	let { crumbs, title, description, children, class: className }: Props = $props();
</script>

<Container
	as="main"
	class={['flex flex-col gap-8 pt-8 pb-16 lg:gap-12 lg:pt-10 lg:pb-20', className]}
>
	<header class="flex flex-col gap-4">
		<PageBreadcrumb {crumbs} />

		<h1 class="text-display text-foreground">
			{@render title()}
		</h1>

		{#if description}
			<p class="text-lead text-muted-foreground">
				{description}
			</p>
		{/if}
	</header>

	{@render children()}
</Container>

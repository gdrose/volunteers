<script lang="ts" module>
	export type Crumb = { label: string; path?: string };
</script>

<script lang="ts">
	import type { Pathname } from '$app/types';
	import { resolve } from '$app/paths';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages.js';

	type Props = {
		/** Trail after "Home"; the last crumb is the current page. */
		crumbs: Crumb[];
	};

	let { crumbs }: Props = $props();

	const trail = $derived<Crumb[]>([{ label: m.breadcrumb_home(), path: '/' }, ...crumbs]);
</script>

<Breadcrumb.Root>
	<Breadcrumb.List>
		{#each trail as crumb, i (crumb.label)}
			{#if i > 0}
				<Breadcrumb.Separator>/</Breadcrumb.Separator>
			{/if}
			<Breadcrumb.Item>
				{#if i === trail.length - 1 || !crumb.path}
					<Breadcrumb.Page>{crumb.label}</Breadcrumb.Page>
				{:else}
					<Breadcrumb.Link href={resolve(localizeHref(crumb.path) as Pathname)}>
						{crumb.label}
					</Breadcrumb.Link>
				{/if}
			</Breadcrumb.Item>
		{/each}
	</Breadcrumb.List>
</Breadcrumb.Root>

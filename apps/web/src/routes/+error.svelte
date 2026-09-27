<script lang="ts">
	import type { Pathname } from '$app/types';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { ArrowLink, PageLayout, Seo } from '$lib/components/shared';
	import { findGroupLink } from '$lib/components/nav/nav-links';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages.js';

	const notFound = $derived(page.status === 404);
	const heading = $derived(notFound ? m.error_not_found_title() : m.error_generic_title());
	const description = $derived(
		notFound ? m.error_not_found_description() : m.error_generic_description()
	);

	const links = [
		{ label: m.breadcrumb_home, path: '/' },
		{ label: m.nav_what_we_do, path: '/what-we-do' },
		findGroupLink
	];
</script>

<Seo title={heading} {description} />

<PageLayout crumbs={[{ label: heading }]} {description}>
	{#snippet title()}
		{heading}
	{/snippet}

	<ul class="flex flex-col gap-3">
		{#each links as link (link.path)}
			<li>
				<ArrowLink href={resolve(localizeHref(link.path) as Pathname)}>{link.label()}</ArrowLink>
			</li>
		{/each}
	</ul>
</PageLayout>

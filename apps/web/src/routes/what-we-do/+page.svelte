<script lang="ts">
	import type { Pathname } from '$app/types';
	import { resolve } from '$app/paths';
	import { PageLayout } from '$lib/components/shared';
	import {
		ProjectShowcase,
		getProjectDetail,
		projectPhotos,
		projects
	} from '$lib/components/projects';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { NewsletterSection } from '$lib/components/newsletter';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages.js';

	const detailHref = (id: string) =>
		getProjectDetail(id) ? resolve(localizeHref(`/what-we-do/${id}`) as Pathname) : undefined;
</script>

<PageLayout crumbs={[{ label: m.nav_what_we_do() }]} description={m.what_we_do_description()}>
	{#snippet title()}
		{m.what_we_do_title()} <span class="text-primary">{m.what_we_do_title_highlight()}</span>
	{/snippet}

	<div class="flex flex-col gap-16 lg:gap-28 lg:pt-4">
		{#each projects as project, i (project.id)}
			<ProjectShowcase
				{project}
				photos={projectPhotos[project.id]}
				href={detailHref(project.id)}
				reverse={i % 2 === 1}
			/>
		{/each}
	</div>

	<Card.Root variant="callout" class="mt-8 lg:mt-16">
		<Card.Title role="heading" aria-level={2}>{m.project_find_group_title()}</Card.Title>
		<Card.Description>{m.project_find_group_description()}</Card.Description>
		<Button href={resolve(localizeHref('/find-a-group') as Pathname)} size="cta-xl">
			{m.nav_find_group()}<span aria-hidden="true">→</span>
		</Button>
	</Card.Root>

	<NewsletterSection />
</PageLayout>

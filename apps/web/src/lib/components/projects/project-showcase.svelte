<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { PhotoMosaic } from '$lib/components/shared';
	import type { ProjectShowcaseData } from './projects';
	import { m } from '$lib/paraglide/messages.js';

	type Props = {
		project: ProjectShowcaseData;
		/** Detail page; without one the CTA shows as coming soon. */
		href?: string;
	};

	let { project, href }: Props = $props();

	const photos = $derived(project.showcasePhotos ?? []);
	const titleId = $derived(`${project.slug}-title`);
</script>

<section
	id={project.slug}
	aria-labelledby={titleId}
	class="flex scroll-mt-24 flex-col gap-6 lg:grid lg:grid-cols-12 lg:items-center lg:gap-16"
>
	<!-- Same order on every project and breakpoint: text first (left on desktop), then photos. -->
	{@render text()}
	{#if photos.length}
		<PhotoMosaic {photos} title={project.title} class="lg:col-span-7" />
	{/if}
</section>

{#snippet text()}
	<div class="flex flex-col items-start gap-3 lg:col-span-5 lg:gap-5">
		<h2 id={titleId} class="text-h1 text-foreground">
			{project.title}
		</h2>
		<p class="text-lead text-muted-foreground">
			{project.teaser}
		</p>
		<div class="w-full pt-2 sm:w-auto lg:pt-1">
			{#if href}
				<Button {href} size="lg" class="w-full sm:w-auto">
					{m.what_we_do_cta({ project: project.title })}<span aria-hidden="true">→</span>
				</Button>
			{:else}
				<Button size="lg" variant="outline" disabled class="w-full sm:w-auto">
					{m.what_we_do_coming_soon()}
				</Button>
			{/if}
		</div>
	</div>
{/snippet}

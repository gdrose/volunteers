<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { PhotoLightbox, SanityImage } from '$lib/components/shared';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import ZoomInIcon from '@lucide/svelte/icons/zoom-in';
	import { cn } from '$lib/utils.js';
	import { urlFor } from '$lib/sanity/image';
	import type { ProjectImage, ProjectShowcaseData } from './projects';
	import { m } from '$lib/paraglide/messages.js';

	type Props = {
		project: ProjectShowcaseData;
		/** Detail page; without one the CTA shows as coming soon. */
		href?: string;
	};

	let { project, href }: Props = $props();

	const photos = $derived(project.showcasePhotos ?? []);
	const [lead, ...rest] = $derived(photos);
	const titleId = $derived(`${project.slug}-title`);

	let viewerOpen = $state(false);
	let viewerStart = $state(0);

	function openViewer(index: number) {
		viewerStart = index;
		viewerOpen = true;
	}
</script>

<section
	id={project.slug}
	aria-labelledby={titleId}
	class="flex scroll-mt-24 flex-col gap-6 lg:grid lg:grid-cols-12 lg:items-center lg:gap-16"
>
	<!-- Same order on every project and breakpoint: text first (left on desktop), then photos. -->
	{@render text()}
	{@render gallery()}
</section>

<PhotoLightbox
	bind:open={viewerOpen}
	start={viewerStart}
	title={project.title}
	photos={photos.map((image) => ({ src: urlFor(image).width(1600).url(), alt: image.alt ?? '' }))}
/>

<!-- Each photo opens the full-screen viewer. -->
{#snippet gallery()}
	<div class="grid grid-cols-2 gap-2 lg:col-span-7 lg:h-130 lg:grid-cols-3 lg:grid-rows-2 lg:gap-3">
		{#if lead}
			{@render photo(lead, 0, 'col-span-2 aspect-4/3 lg:row-span-2 lg:aspect-auto')}
		{/if}
		{#each rest as image, i (image._key)}
			{@render photo(
				image,
				i + 1,
				rest.length === 1
					? 'col-span-2 aspect-2/1 lg:col-span-1 lg:row-span-2 lg:aspect-auto'
					: 'aspect-square lg:aspect-auto'
			)}
		{/each}
	</div>
{/snippet}

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

{#snippet photo(image: ProjectImage, index: number, layout: string)}
	<button
		type="button"
		aria-haspopup="dialog"
		onclick={() => openViewer(index)}
		class={cn(
			'group/photo relative cursor-zoom-in overflow-hidden rounded-2xl bg-muted lg:rounded-3xl',
			layout
		)}
	>
		<SanityImage
			{image}
			width={index === 0 ? 800 : 480}
			loading="lazy"
			class="size-full object-cover transition-transform duration-700 ease-out motion-safe:group-hover/photo:scale-105"
		/>
		<!-- Zoom cue: always shown (touch has no hover); the lead photo also tells how many there are. -->
		<Badge
			variant="overlay"
			size={index === 0 ? 'pill' : 'icon'}
			aria-hidden="true"
			class="absolute end-3 bottom-3 transition-transform duration-200 group-hover/photo:scale-110 lg:end-4 lg:bottom-4"
		>
			<ZoomInIcon />
			{#if index === 0}{m.what_we_do_photo_count({ count: photos.length })}{/if}
		</Badge>
	</button>
{/snippet}

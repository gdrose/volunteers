<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { PhotoLightbox } from '$lib/components/shared';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import ZoomInIcon from '@lucide/svelte/icons/zoom-in';
	import { cn } from '$lib/utils.js';
	import type { Project } from './projects';
	import type { ProjectImage } from './project-details';
	import { m } from '$lib/paraglide/messages.js';

	type Props = {
		project: Project;
		photos: ProjectImage[];
		/** Detail page; without one the CTA shows as coming soon. */
		href?: string;
		/** Puts the photos on the right on desktop. */
		reverse?: boolean;
	};

	let { project, photos, href, reverse = false }: Props = $props();

	const [lead, ...rest] = $derived(photos);
	const titleId = $derived(`${project.id}-title`);

	let viewerOpen = $state(false);
	let viewerStart = $state(0);

	function openViewer(index: number) {
		viewerStart = index;
		viewerOpen = true;
	}
</script>

<section
	id={project.id}
	aria-labelledby={titleId}
	class="flex scroll-mt-24 flex-col gap-6 lg:grid lg:grid-cols-12 lg:items-center lg:gap-16"
>
	<!-- Photos lead the section; each one opens the full-screen viewer. -->
	<div
		class={cn(
			'grid grid-cols-2 gap-2 lg:col-span-7 lg:h-130 lg:grid-cols-3 lg:grid-rows-2 lg:gap-3',
			reverse && 'lg:order-last'
		)}
	>
		{@render photo(lead, 0, 'col-span-2 aspect-4/3 lg:row-span-2 lg:aspect-auto')}
		{#each rest as image, i (i)}
			{@render photo(
				image,
				i + 1,
				rest.length === 1
					? 'col-span-2 aspect-2/1 lg:col-span-1 lg:row-span-2 lg:aspect-auto'
					: 'aspect-square lg:aspect-auto'
			)}
		{/each}
	</div>

	<div class="flex flex-col items-start gap-3 lg:col-span-5 lg:gap-5">
		<h2 id={titleId} class="text-h1 text-foreground">
			{project.title()}
		</h2>
		<p class="text-lead text-muted-foreground">
			{project.description()}
		</p>
		<div class="w-full pt-2 sm:w-auto lg:pt-1">
			{#if href}
				<Button {href} size="xl" class="w-full sm:w-auto">
					{m.what_we_do_cta({ project: project.title() })}<span aria-hidden="true">→</span>
				</Button>
			{:else}
				<Button size="xl" variant="outline" disabled class="w-full sm:w-auto">
					{m.what_we_do_coming_soon()}
				</Button>
			{/if}
		</div>
	</div>
</section>

<PhotoLightbox
	bind:open={viewerOpen}
	start={viewerStart}
	title={project.title()}
	photos={photos.map((image) => ({ src: image.src, alt: image.alt() }))}
/>

{#snippet photo(image: ProjectImage, index: number, layout: string)}
	<button
		type="button"
		aria-haspopup="dialog"
		onclick={() => openViewer(index)}
		class={cn(
			'group/photo relative cursor-zoom-in overflow-hidden rounded-[20px] bg-muted outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 lg:rounded-[24px]',
			layout
		)}
	>
		<img
			src={image.src}
			alt={image.alt()}
			loading="lazy"
			class={cn(
				'size-full object-cover transition-transform duration-700 ease-out motion-safe:group-hover/photo:scale-105',
				image.position
			)}
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

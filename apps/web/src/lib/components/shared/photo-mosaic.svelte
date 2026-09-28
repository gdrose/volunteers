<script lang="ts">
	import ZoomInIcon from '@lucide/svelte/icons/zoom-in';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { cn } from '$lib/utils.js';
	import { urlFor, type SanityImageValue } from '$lib/sanity/image';
	import PhotoLightbox from './photo-lightbox.svelte';
	import SanityImage from './sanity-image.svelte';
	import { m } from '$lib/paraglide/messages.js';

	type Props = {
		photos: (SanityImageValue & { _key: string })[];
		/** Accessible name of the full-screen viewer, e.g. the project title. */
		title: string;
		class?: string;
	};

	let { photos, title, class: className }: Props = $props();

	/** Tiles in the mosaic; the viewer pages through every photo. */
	const MAX_TILES = 3;

	const [lead, ...rest] = $derived(photos.slice(0, MAX_TILES));

	let viewerOpen = $state(false);
	let viewerStart = $state(0);

	function openViewer(index: number) {
		viewerStart = index;
		viewerOpen = true;
	}
</script>

<!-- Each photo opens the full-screen viewer. -->
<div
	role="group"
	aria-label={m.project_gallery_label()}
	class={cn('grid grid-cols-2 gap-2 lg:h-130 lg:grid-cols-3 lg:grid-rows-2 lg:gap-3', className)}
>
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

<PhotoLightbox
	bind:open={viewerOpen}
	start={viewerStart}
	{title}
	photos={photos.map((image) => ({ src: urlFor(image).width(1600).url(), alt: image.alt ?? '' }))}
/>

{#snippet photo(image: SanityImageValue, index: number, layout: string)}
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

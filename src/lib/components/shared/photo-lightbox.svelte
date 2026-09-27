<script lang="ts" module>
	export type LightboxPhoto = { src: string; alt: string };
</script>

<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import type { CarouselAPI } from '$lib/components/ui/carousel/context.js';
	import { m } from '$lib/paraglide/messages.js';

	type Props = {
		open: boolean;
		photos: LightboxPhoto[];
		/** Photo shown when the viewer opens. */
		start?: number;
		/** Accessible name of the viewer, e.g. the project title. */
		title: string;
	};

	let { open = $bindable(), photos, start = 0, title }: Props = $props();

	/** Downward drag (px) past which releasing closes the viewer. */
	const DISMISS_DISTANCE = 120;

	let api = $state<CarouselAPI>();
	let current = $state(0);
	let touchStart: { x: number; y: number } | undefined;
	let dragY = $state(0);
	let dragging = $state(false);

	function setApi(next: CarouselAPI | undefined) {
		api = next;
		current = next?.selectedScrollSnap() ?? 0;
		next?.on('select', () => (current = next.selectedScrollSnap()));
	}

	function onkeydown(event: KeyboardEvent) {
		if (event.key === 'ArrowLeft') api?.scrollPrev();
		else if (event.key === 'ArrowRight') api?.scrollNext();
	}

	// Swipe down to close: horizontal swipes stay with the carousel.
	function ontouchstart(event: TouchEvent) {
		if (event.touches.length !== 1) return;
		touchStart = { x: event.touches[0].clientX, y: event.touches[0].clientY };
	}

	function ontouchmove(event: TouchEvent) {
		if (!touchStart || event.touches.length !== 1) return;
		const dx = event.touches[0].clientX - touchStart.x;
		const dy = event.touches[0].clientY - touchStart.y;
		if (!dragging && (dy < 10 || Math.abs(dx) > dy)) return;
		dragging = true;
		dragY = Math.max(0, dy);
	}

	// Tapping anywhere but a control, the photo included, closes the viewer. Embla
	// swallows the click that ends a swipe, so dragging never closes it by accident.
	function onclick(event: MouseEvent) {
		const target = event.target as Element;
		if (!target.closest('button')) open = false;
	}

	function ontouchend() {
		if (dragging && dragY > DISMISS_DISTANCE) open = false;
		touchStart = undefined;
		dragging = false;
		dragY = 0;
	}
</script>

<Dialog.Root bind:open>
	<Dialog.Content
		variant="lightbox"
		showCloseButton={false}
		{onkeydown}
		{onclick}
		{ontouchstart}
		{ontouchmove}
		{ontouchend}
		ontouchcancel={ontouchend}
	>
		<Dialog.Title class="sr-only">{title}</Dialog.Title>

		<!-- No visible close button: tap anywhere but a control, press Esc or swipe down. -->
		<Dialog.Close class="sr-only">{m.lightbox_close()}</Dialog.Close>
		<p class="sr-only" aria-live="polite">
			{m.lightbox_slide({ index: current + 1, total: photos.length })}
		</p>

		<!-- Mounted on every open, so startIndex always matches the photo that was clicked. -->
		<Carousel.Root
			opts={{ startIndex: start, loop: photos.length > 1 }}
			{setApi}
			aria-label={title}
			class="flex min-h-0 flex-1 flex-col pt-[max(3rem,env(safe-area-inset-top))] sm:pt-16"
			style="transform: translateY({dragY}px); opacity: {1 - Math.min(dragY / 400, 0.6)};
				transition: {dragging ? 'none' : 'transform 200ms, opacity 200ms'}"
		>
			<!-- Full-bleed photos on phones, with a gutter between slides while swiping. -->
			<Carousel.Content variant="lightbox" class="h-full">
				{#each photos as photo, i (i)}
					<Carousel.Item
						aria-label={m.lightbox_slide({ index: i + 1, total: photos.length })}
						class="flex h-full items-center justify-center sm:ps-28 sm:pe-24 lg:ps-36 lg:pe-32"
					>
						<img
							src={photo.src}
							alt={photo.alt}
							draggable="false"
							class="max-h-full max-w-full object-contain select-none sm:rounded-2xl"
						/>
					</Carousel.Item>
				{/each}
			</Carousel.Content>

			{#if photos.length > 1}
				<!-- Each side of the viewer is a full-height click zone (desktop; phones swipe). -->
				<Carousel.Previous layout="edge" class="hidden sm:flex" />
				<Carousel.Next layout="edge" class="hidden sm:flex" />
			{/if}

			<footer
				class="flex flex-col items-center gap-4 px-4 pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-center sm:px-24 lg:px-32"
			>
				<p class="text-small">{photos[current]?.alt}</p>
				{#if photos.length > 1}
					<Carousel.Dots label={(index) => m.carousel_go_to_slide({ index })} />
				{/if}
			</footer>
		</Carousel.Root>
	</Dialog.Content>
</Dialog.Root>

<script lang="ts">
	import type { HTMLImgAttributes } from 'svelte/elements';
	import { hotspotPosition, urlFor, type SanityImageValue } from '$lib/sanity/image';

	type Props = Omit<HTMLImgAttributes, 'src' | 'srcset' | 'sizes'> & {
		image: SanityImageValue;
		/** Widest the image is ever shown, in CSS pixels. Renditions go up to 2× this for dense screens. */
		width: number;
		/**
		 * Displayed width per breakpoint, so the browser picks the smallest rendition that fits
		 * (e.g. "(min-width: 64rem) 420px, 100vw"). Defaults to `width`, capped at the viewport.
		 */
		sizes?: string;
	};

	let { image, width, sizes, alt = image.alt ?? '', style, ...rest }: Props = $props();

	// Half, full, 1.5× and 2× the displayed width cover phones up to dense desktop screens.
	const RENDITIONS = [0.5, 1, 1.5, 2];

	const srcset = $derived(
		RENDITIONS.map((scale) => Math.round(width * scale))
			.map((w) => `${urlFor(image).width(w).url()} ${w}w`)
			.join(', ')
	);
	const position = $derived(hotspotPosition(image));
</script>

<img
	src={urlFor(image).width(width).url()}
	{srcset}
	sizes={sizes ?? `(min-width: ${width}px) ${width}px, 100vw`}
	{alt}
	style={[position && `object-position: ${position}`, style].filter(Boolean).join('; ') ||
		undefined}
	{...rest}
/>

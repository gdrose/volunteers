<script lang="ts">
	import type { HTMLImgAttributes } from 'svelte/elements';
	import { hotspotPosition, urlFor, type SanityImageValue } from '$lib/sanity/image';

	type Props = Omit<HTMLImgAttributes, 'src' | 'srcset'> & {
		image: SanityImageValue;
		/** Widest rendition to request, in CSS pixels; a 2× variant is added for dense screens. */
		width: number;
	};

	let { image, width, alt = image.alt ?? '', style, ...rest }: Props = $props();

	const url = $derived(urlFor(image).width(width));
	const position = $derived(hotspotPosition(image));
</script>

<img
	src={url.url()}
	srcset="{url.url()} 1x, {url.width(width * 2).url()} 2x"
	{alt}
	style={[position && `object-position: ${position}`, style].filter(Boolean).join('; ') ||
		undefined}
	{...rest}
/>

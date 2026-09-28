import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';
import { client } from './client';

const builder = createImageUrlBuilder(client);

export type SanityImageValue = {
	asset?: { _ref: string };
	hotspot?: { x?: number; y?: number };
	alt?: string | null;
};

export function urlFor(source: SanityImageSource) {
	return builder.image(source).auto('format');
}

/** CSS object-position that keeps the editor's hotspot in view under `object-cover`. */
export function hotspotPosition(image: SanityImageValue) {
	const { x, y } = image.hotspot ?? {};
	return x === undefined || y === undefined ? undefined : `${x * 100}% ${y * 100}%`;
}

/** Link-preview image (`og:image`): 1200×630, cropped around the hotspot. */
export function shareImageUrl(image: SanityImageSource) {
	return urlFor(image).width(1200).height(630).fit('crop').url();
}

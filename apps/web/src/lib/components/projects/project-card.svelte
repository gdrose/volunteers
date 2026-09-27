<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { ArrowLink, SanityImage } from '$lib/components/shared';
	import type { SanityImageValue } from '$lib/sanity/image';

	type Props = {
		title: string;
		description: string;
		image: SanityImageValue;
		href: string;
		linkLabel: string;
		class?: string;
	};

	let { title, description, image, href, linkLabel, class: className }: Props = $props();
</script>

<Card.Root variant="project" class={className}>
	<SanityImage
		{image}
		width={400}
		sizes="(min-width: 64rem) 260px, (min-width: 40rem) 50vw, 100vw"
		alt=""
		loading="lazy"
		class="h-40 w-full rounded-xl object-cover transition-transform duration-500 ease-out motion-safe:group-hover/card:scale-105 lg:h-44"
	/>

	<Card.Content class="flex flex-1 flex-col gap-2 px-0 lg:gap-3.5">
		<Card.Title role="heading" aria-level={3}>{title}</Card.Title>
		<Card.Description>{description}</Card.Description>
	</Card.Content>

	<Card.Footer class="px-0">
		<ArrowLink {href}>{linkLabel}</ArrowLink>
	</Card.Footer>
</Card.Root>

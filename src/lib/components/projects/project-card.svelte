<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { ArrowLink } from '$lib/components/shared';
	import { cn } from '$lib/utils.js';

	type Props = {
		title: string;
		description: string;
		image: string;
		imageClass?: string;
		href: string;
		linkLabel: string;
		class?: string;
	};

	let {
		title,
		description,
		image,
		imageClass,
		href,
		linkLabel,
		class: className
	}: Props = $props();
</script>

<Card.Root variant="project" class={className}>
	<img
		src={image}
		alt=""
		loading="lazy"
		class={cn(
			'h-40 w-full rounded-xl object-cover transition-transform duration-500 ease-out motion-safe:group-hover/card:scale-105 lg:h-[173px]',
			imageClass
		)}
	/>

	<Card.Content class="flex flex-1 flex-col gap-2 px-0 lg:gap-3.5">
		<Card.Title role="heading" aria-level={3}>{title}</Card.Title>
		<Card.Description>{description}</Card.Description>
	</Card.Content>

	<Card.Footer class="px-0">
		<ArrowLink {href}>{linkLabel}</ArrowLink>
	</Card.Footer>
</Card.Root>

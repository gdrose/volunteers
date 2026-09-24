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

<Card.Root
	class={cn(
		'gap-4 overflow-visible rounded-[20px] p-4 ring-0 has-[>img:first-child]:pt-4 lg:gap-3.5 lg:rounded-3xl lg:pt-[13px] lg:pr-1 lg:pb-[26px] lg:pl-2.5 lg:has-[>img:first-child]:pt-[13px]',
		className
	)}
>
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
		<Card.Title
			role="heading"
			aria-level={3}
			class="text-lg leading-normal font-extrabold text-foreground lg:text-xl lg:font-black"
		>
			{title}
		</Card.Title>
		<Card.Description
			class="text-[13px] leading-[18px] lg:text-sm lg:leading-normal lg:font-medium lg:text-foreground"
		>
			{description}
		</Card.Description>
	</Card.Content>

	<Card.Footer class="px-0">
		<ArrowLink {href}>{linkLabel}</ArrowLink>
	</Card.Footer>
</Card.Root>

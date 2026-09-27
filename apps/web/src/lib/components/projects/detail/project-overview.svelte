<script lang="ts">
	import type { Pathname } from '$app/types';
	import { resolve } from '$app/paths';
	import { Container } from '$lib/components/shared';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { cn } from '$lib/utils.js';
	import type { ProjectDetail } from '../project-details';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages.js';

	let { project }: { project: ProjectDetail } = $props();
</script>

<Container class="flex flex-col gap-8 pt-2 pb-10 lg:gap-12 lg:pt-8 lg:pb-14">
	<section aria-labelledby="project-intro" class="flex flex-col gap-4 pb-4 lg:gap-5 lg:pb-0">
		<h2 id="project-intro" class="text-h3 text-foreground">
			{project.intro()}
		</h2>
		{#each project.paragraphs as paragraph, i (i)}
			<p class="text-body text-muted-foreground">
				{paragraph()}
			</p>
		{/each}
	</section>

	<Separator />

	<section aria-labelledby="project-activities" class="flex flex-col gap-5 lg:gap-8">
		<h2 id="project-activities" class="text-h3 text-foreground">
			{m.project_activities_title()}
		</h2>

		<Carousel.Root
			opts={{ align: 'start' }}
			aria-label={m.project_gallery_label()}
			class="flex flex-col gap-5 lg:gap-6"
		>
			<Carousel.Content variant="gallery" class="-ms-3 lg:-ms-4">
				{#each project.gallery as image, i (i)}
					<Carousel.Item class="basis-[250px] ps-3 lg:basis-[38.93%] lg:ps-4">
						<img
							src={image.src}
							alt={image.alt()}
							loading="lazy"
							class={cn(
								'h-80 w-full rounded-[20px] object-cover lg:h-105 lg:rounded-[24px]',
								image.position
							)}
						/>
					</Carousel.Item>
				{/each}
			</Carousel.Content>
			<Carousel.Dots label={(index) => m.carousel_go_to_slide({ index })} />
		</Carousel.Root>

		<ul
			class="flex flex-col gap-2 pt-2 lg:grid lg:grid-cols-[repeat(2,420px)] lg:justify-center lg:gap-3 lg:pt-0"
		>
			{#each project.activities as activity (activity.id)}
				<li class="flex items-center gap-3 lg:p-3">
					<span
						class="flex size-5 shrink-0 items-center justify-center rounded-[6px] border border-primary bg-primary/10 lg:size-10 lg:rounded-[12px] lg:bg-background"
					>
						<img src={activity.icon} alt="" width="22" height="22" class="size-3 lg:size-[22px]" />
					</span>
					<span class="text-small font-bold text-foreground">
						{activity.label()}
					</span>
				</li>
			{/each}
		</ul>
	</section>

	<Separator class="hidden lg:block" />

	<Card.Root variant="callout">
		<Card.Title role="heading" aria-level={2}>{m.project_find_group_title()}</Card.Title>
		<Card.Description>{m.project_find_group_description()}</Card.Description>
		<Button href={resolve(localizeHref('/find-a-group') as Pathname)} size="cta-xl">
			{m.nav_find_group()}<span aria-hidden="true">→</span>
		</Button>
	</Card.Root>
</Container>

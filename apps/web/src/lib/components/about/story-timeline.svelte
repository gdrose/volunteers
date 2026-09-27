<script lang="ts">
	import { Container, SanityImage } from '$lib/components/shared';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import timelineDot from '$lib/assets/about/story/timeline-dot.svg';
	import type { Milestone } from './about';
	import { m } from '$lib/paraglide/messages.js';

	/** Oldest first; the last milestone is the present day. */
	let { milestones }: { milestones: Milestone[] } = $props();

	// Dotted connector between year badges, as in the design (3px dots every 10px).
	const connectorDots = [...Array(18).keys()];
</script>

<section aria-labelledby="story-title" class="w-full bg-muted">
	<Container class="flex flex-col gap-8 pt-10 pb-12 lg:gap-6 lg:py-10">
		<header class="flex flex-col gap-3 lg:max-w-190 lg:gap-2">
			<h2 id="story-title" class="text-h1 text-foreground">
				{m.about_story_title()}
			</h2>
			<p class="text-lead text-muted-foreground">
				{m.about_story_description()}
			</p>
		</header>

		<ol class="flex flex-col gap-6 lg:gap-2.5">
			{#each milestones as milestone, i (milestone._key)}
				{@const current = i === milestones.length - 1}
				<li class="relative lg:flex lg:items-center lg:gap-6">
					<Badge
						variant={current ? 'default' : 'outline-primary'}
						size="lg"
						class="hidden lg:inline-flex"
					>
						{milestone.period}
					</Badge>

					{#if i < milestones.length - 1}
						<div
							aria-hidden="true"
							class="absolute top-[calc(50%+28px)] left-[42.5px] hidden flex-col gap-[7px] lg:flex"
						>
							{#each connectorDots as dot (dot)}
								<img src={timelineDot} alt="" width="3" height="3" />
							{/each}
						</div>
					{/if}

					<Card.Root variant="timeline" class="lg:min-w-0 lg:flex-1">
						{#if milestone.image}
							<SanityImage
								image={milestone.image}
								width={420}
								alt=""
								loading="lazy"
								class="h-52.5 w-full object-cover lg:h-55 lg:w-105 lg:shrink-0"
							/>
						{/if}
						<Card.Content class="flex flex-col gap-2 lg:min-w-0 lg:flex-1">
							<p class="text-small font-bold text-primary lg:hidden">
								{milestone.period}
							</p>
							<h3 class="text-h3 text-foreground">
								{milestone.title}
							</h3>
							<p class="text-body text-muted-foreground">
								{milestone.description}
							</p>
						</Card.Content>
					</Card.Root>
				</li>
			{/each}
		</ol>
	</Container>
</section>

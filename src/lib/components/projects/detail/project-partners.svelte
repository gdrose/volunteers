<script lang="ts">
	import { Container } from '$lib/components/shared';
	import type { ProjectPartner } from '../project-details';
	import { m } from '$lib/paraglide/messages.js';

	let { partners }: { partners: ProjectPartner[] } = $props();
</script>

<section aria-labelledby="project-partners" class="w-full border-t">
	<Container class="flex flex-col gap-6 pt-10 pb-12 lg:gap-7 lg:pt-14 lg:pb-18">
		<h2
			id="project-partners"
			class="text-center text-[26px] leading-normal font-extrabold text-foreground lg:text-[28px] lg:leading-9"
		>
			{m.project_partners_title()}
		</h2>

		<div
			role="list"
			class="flex flex-col gap-4 rounded-[20px] border p-5 lg:flex-row lg:items-center lg:justify-center lg:gap-[42px] lg:px-10 lg:py-8"
		>
			{#each partners as partner, i (partner.name)}
				{#if i > 0}
					<span aria-hidden="true" class="hidden h-12 w-px bg-border lg:block"></span>
				{/if}
				<div role="listitem" class="flex items-center gap-3.5 lg:w-30 lg:flex-col lg:gap-2">
					<span
						aria-hidden="true"
						class="flex size-12 shrink-0 items-center justify-center rounded-[14px] bg-primary/10 text-lg font-extrabold text-primary lg:size-14 lg:rounded-[16px] lg:text-xl"
					>
						{partner.initial}
					</span>
					<span class="text-[15px] leading-normal font-bold text-foreground lg:text-xs">
						{partner.name}
					</span>
				</div>
			{/each}
		</div>
	</Container>
</section>

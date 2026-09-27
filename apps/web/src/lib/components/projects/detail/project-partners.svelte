<script lang="ts">
	import { Container } from '$lib/components/shared';
	import * as Item from '$lib/components/ui/item/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { m } from '$lib/paraglide/messages.js';

	let { partners }: { partners: string[] } = $props();
</script>

<section aria-labelledby="project-partners" class="w-full border-t">
	<Container class="flex flex-col gap-6 pt-10 pb-12 lg:gap-7 lg:pt-14 lg:pb-18">
		<h2 id="project-partners" class="text-center text-h2 text-foreground">
			{m.project_partners_title()}
		</h2>

		<Item.Group>
			{#each partners as partner, i (partner)}
				{#if i > 0}
					<Separator orientation="vertical" class="hidden lg:block" />
				{/if}
				<Item.Root role="listitem" size="partner">
					<Item.Media variant="monogram" aria-hidden="true">
						{partner.charAt(0).toUpperCase()}
					</Item.Media>
					<Item.Title>{partner}</Item.Title>
				</Item.Root>
			{/each}
		</Item.Group>
	</Container>
</section>

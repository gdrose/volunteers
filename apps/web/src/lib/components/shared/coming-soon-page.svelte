<script lang="ts">
	import type { Pathname } from '$app/types';
	import { resolve } from '$app/paths';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages.js';
	import PageLayout from './page-layout.svelte';
	import Seo from './seo.svelte';

	/** Placeholder for a page that isn't written yet: says so and points to the contact page. */
	let { name }: { name: string } = $props();
</script>

<Seo title={name} description={m.stub_description()} />

<PageLayout crumbs={[{ label: name }]}>
	{#snippet title()}
		{name}
	{/snippet}

	<Card.Root variant="callout">
		<Card.Description>{m.stub_description()}</Card.Description>
		<Button href={resolve(localizeHref('/contact') as Pathname)} size="lg">
			{m.footer_contact_us()}<span aria-hidden="true">→</span>
		</Button>
	</Card.Root>
</PageLayout>

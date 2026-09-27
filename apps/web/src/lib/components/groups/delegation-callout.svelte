<script lang="ts">
	import type { Pathname } from '$app/types';
	import { resolve } from '$app/paths';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages.js';
</script>

<Card.Root variant="callout">
	<Card.Title role="heading" aria-level={2}>{m.find_group_cta_title()}</Card.Title>
	<Card.Description class="max-w-150">{m.find_group_cta_description()}</Card.Description>
	<Button href={resolve(localizeHref('/contact') as Pathname)} size="lg" class="w-full lg:w-auto">
		{m.find_group_cta_button()}<span aria-hidden="true">→</span>
	</Button>
</Card.Root>

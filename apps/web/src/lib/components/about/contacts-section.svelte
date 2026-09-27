<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Container } from '$lib/components/shared';
	import arrowUpRight from '$lib/assets/about/contacts/arrow-up-right.svg';
	import { offices } from './contacts';
	import { m } from '$lib/paraglide/messages.js';
</script>

<section aria-labelledby="contacts-title" class="w-full bg-muted">
	<Container class="flex flex-col gap-6 pt-10 pb-12 lg:gap-8 lg:pt-16 lg:pb-18">
		<h2 id="contacts-title" class="text-h1 text-foreground">
			{m.about_contacts_title()}
			<span class="text-primary">{m.about_contacts_title_highlight()}</span>
		</h2>

		<ul class="flex flex-col gap-4 lg:flex-row lg:gap-6">
			{#each offices as office (office.id)}
				<li class="lg:min-w-0 lg:flex-1">
					<Card.Root variant="contact" class="h-full">
						<Card.Header>
							<Card.Title role="heading" aria-level={3}>{office.title()}</Card.Title>
							<Card.Action>
								<img src={arrowUpRight} alt="" width="16" height="16" />
							</Card.Action>
						</Card.Header>
						<Card.Content>
							<Card.Description>{office.description()}</Card.Description>
						</Card.Content>
						<Card.Footer class="flex-col items-start gap-2 lg:flex-row lg:gap-6">
							<span class="text-foreground">{office.location()}</span>
							<a href="mailto:{office.email}" class="text-link hover:underline">
								<span aria-hidden="true">✉️&nbsp;&nbsp;</span>{office.email}
							</a>
						</Card.Footer>
					</Card.Root>
				</li>
			{/each}
		</ul>
	</Container>
</section>

<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Field from '$lib/components/ui/field/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { m } from '$lib/paraglide/messages.js';
	import { contactTopics } from './topics';

	let topic = $state('');
	let sent = $state(false);

	const topicLabel = $derived(contactTopics.find((t) => t.id === topic)?.label());

	// TODO: wire up to the contact endpoint once available.
	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		sent = true;
	}
</script>

<Card.Root variant="form">
	{#if sent}
		<div role="status" class="flex flex-col gap-2">
			<Card.Title role="heading" aria-level={2}>{m.contact_success_title()}</Card.Title>
			<Card.Description>{m.contact_success_description()}</Card.Description>
		</div>
	{:else}
		<Card.Title role="heading" aria-level={2}>{m.contact_form_title()}</Card.Title>

		<form class="flex flex-col gap-6 lg:gap-8" onsubmit={handleSubmit}>
			<Field.Group>
				<div class="grid gap-7 lg:grid-cols-2 lg:gap-6">
					<Field.Field>
						<Field.Label for="contact-name">{m.contact_name_label()}</Field.Label>
						<Input
							id="contact-name"
							name="name"
							autocomplete="name"
							required
							placeholder={m.contact_name_placeholder()}
						/>
					</Field.Field>
					<Field.Field>
						<Field.Label for="contact-email">{m.contact_email_label()}</Field.Label>
						<Input
							id="contact-email"
							type="email"
							name="email"
							autocomplete="email"
							required
							placeholder={m.contact_email_placeholder()}
						/>
					</Field.Field>
				</div>

				<Field.Field>
					<Field.Label for="contact-topic">{m.contact_topic_label()}</Field.Label>
					<Select.Root type="single" name="topic" required bind:value={topic}>
						<Select.Trigger id="contact-topic">
							{topicLabel ?? m.contact_topic_placeholder()}
						</Select.Trigger>
						<Select.Content>
							{#each contactTopics as option (option.id)}
								<Select.Item value={option.id} label={option.label()} />
							{/each}
						</Select.Content>
					</Select.Root>
				</Field.Field>

				<Field.Field>
					<Field.Label for="contact-message">{m.contact_message_label()}</Field.Label>
					<Textarea
						id="contact-message"
						name="message"
						required
						placeholder={m.contact_message_placeholder()}
					/>
					<Field.Description>{m.contact_message_description()}</Field.Description>
				</Field.Field>
			</Field.Group>

			<Button type="submit" size="cta-xl" class="w-full lg:w-auto lg:self-start">
				{m.contact_submit()}<span aria-hidden="true">→</span>
			</Button>
		</form>
	{/if}
</Card.Root>

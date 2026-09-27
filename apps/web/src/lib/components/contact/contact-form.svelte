<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Field from '$lib/components/ui/field/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { m } from '$lib/paraglide/messages.js';
	import { contactTopics } from './topics';

	/** Inbox the message is addressed to (from the About page offices in the Studio). */
	let { email }: { email: string | null } = $props();

	let topic = $state('');
	let sent = $state(false);

	const topicLabel = $derived(contactTopics.find((t) => t.id === topic)?.label());

	// TODO: post to a contact endpoint once one exists. Until then the form hands the message
	// to the visitor's email app, and the copy says so, rather than pretending to send it.
	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		if (!email) return;
		const data = new FormData(event.currentTarget as HTMLFormElement);
		const subject = [topicLabel, data.get('name')].filter(Boolean).join(' – ');
		const body = `${data.get('message')}\n\n${data.get('name')}\n${data.get('email')}`;
		window.location.href = `mailto:${email}?${new URLSearchParams({ subject, body })
			.toString()
			.replaceAll('+', '%20')}`;
		sent = true;
	}
</script>

<Card.Root variant="form">
	<div class="flex flex-col gap-2">
		<Card.Title role="heading" aria-level={2}>{m.contact_form_title()}</Card.Title>
		<Card.Description>{m.contact_required_note()}</Card.Description>
	</div>

	<form class="flex flex-col gap-6 lg:gap-8" onsubmit={handleSubmit}>
		<Field.Group>
			<div class="grid gap-7 lg:grid-cols-2 lg:gap-6">
				<Field.Field>
					<Field.Label for="contact-name" required>{m.contact_name_label()}</Field.Label>
					<Input
						id="contact-name"
						name="name"
						autocomplete="name"
						required
						placeholder={m.contact_name_placeholder()}
					/>
				</Field.Field>
				<Field.Field>
					<Field.Label for="contact-email" required>{m.contact_email_label()}</Field.Label>
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
				<Field.Label for="contact-topic" required>{m.contact_topic_label()}</Field.Label>
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
				<Field.Label for="contact-message" required>{m.contact_message_label()}</Field.Label>
				<Textarea
					id="contact-message"
					name="message"
					required
					placeholder={m.contact_message_placeholder()}
				/>
				<Field.Description>{m.contact_message_description()}</Field.Description>
			</Field.Field>
		</Field.Group>

		<div class="flex flex-col gap-2 lg:items-start">
			<Button type="submit" size="lg" disabled={!email} class="w-full lg:w-auto">
				{m.contact_submit()}<span aria-hidden="true">→</span>
			</Button>
			<Field.Description>{m.contact_submit_note()}</Field.Description>
		</div>
	</form>

	<!-- Kept in the DOM so screen readers announce the confirmation when it fills in. -->
	<div role="status" class={sent ? 'flex flex-col gap-2' : 'sr-only'}>
		{#if sent}
			<Card.Title role="heading" aria-level={3}>{m.contact_success_title()}</Card.Title>
			<Card.Description>{m.contact_success_description()}</Card.Description>
			<Card.Description>
				{m.contact_success_fallback()}
				<a href="mailto:{email}" class="text-link hover:underline">{email}</a>
			</Card.Description>
		{/if}
	</div>
</Card.Root>

<script lang="ts">
	import { PageLayout } from '$lib/components/shared';
	import { ContactForm } from '$lib/components/contact';
	import { m } from '$lib/paraglide/messages.js';
</script>

<PageLayout crumbs={[{ label: m.footer_contact_us() }]} description={m.contact_description()}>
	{#snippet title()}
		{m.contact_title_before()}<span class="text-primary">{m.contact_title_highlight()}</span>
	{/snippet}

	<ContactForm />
</PageLayout>

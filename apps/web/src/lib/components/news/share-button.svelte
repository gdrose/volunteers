<script lang="ts">
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button/index.js';
	import Share2Icon from '@lucide/svelte/icons/share-2';
	import CheckIcon from '@lucide/svelte/icons/check';
	import { m } from '$lib/paraglide/messages.js';

	let { title }: { title: string } = $props();

	let copied = $state(false);

	// Native share sheet where available (phones); otherwise copy the link.
	async function share() {
		const url = page.url.href;
		if (navigator.share) {
			try {
				await navigator.share({ title, url });
			} catch {
				// Dismissed by the user.
			}
			return;
		}
		await navigator.clipboard.writeText(url);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}
</script>

<Button variant="outline" size="sm" onclick={share}>
	{#if copied}
		<CheckIcon data-icon="inline-start" />
	{:else}
		<Share2Icon data-icon="inline-start" />
	{/if}
	<span aria-live="polite">{copied ? m.news_article_link_copied() : m.news_article_share()}</span>
</Button>

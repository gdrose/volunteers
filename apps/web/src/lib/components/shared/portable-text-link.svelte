<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { MarkComponentProps } from '@portabletext/svelte';

	let {
		portableText,
		children
	}: { portableText: MarkComponentProps<{ href?: string }>; children?: Snippet } = $props();

	const href = $derived(portableText.value.href);
	const external = $derived(href?.startsWith('http'));
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -- editor-provided http/mailto/tel URL -->
<a
	{href}
	target={external ? '_blank' : undefined}
	rel={external ? 'noopener noreferrer' : undefined}
	class="font-semibold text-link underline underline-offset-4">{@render children?.()}</a
>
<!-- eslint-enable svelte/no-navigation-without-resolve -->

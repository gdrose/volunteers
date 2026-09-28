<script lang="ts">
	import { jsonLdScript } from './seo';

	/** Structured data for search engines; build it with the helpers in `schema.ts`. */
	let { schema }: { schema: object } = $props();
</script>

<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- serialized by jsonLdScript, which escapes `<` -->
	{@html jsonLdScript(schema)}
</svelte:head>

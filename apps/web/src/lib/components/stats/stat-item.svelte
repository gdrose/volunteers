<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { formatStatValue } from './stats';

	type Props = {
		value: string;
		label: string;
		description?: string | null;
		class?: string;
	};

	let { value, label, description, class: className }: Props = $props();
</script>

<div class={cn('flex flex-col gap-3 border-b p-4 last:border-b-0 lg:px-0', className)}>
	<dt class="text-h2 text-foreground">
		{formatStatValue(value)}
		<span class="text-muted-foreground">{label}</span>
	</dt>
	{#if description}
		<dd class="text-body text-foreground">
			{description}
		</dd>
	{/if}
</div>

<script lang="ts">
	import { Combobox } from 'bits-ui';
	import searchIcon from '$lib/assets/groups/search.svg';
	import legendLocal from '$lib/assets/groups/legend-local.svg';
	import legendProject from '$lib/assets/groups/legend-project.svg';
	import { m } from '$lib/paraglide/messages.js';
	import { cn } from '$lib/utils.js';
	import { groupArea, groups, searchGroups, type LocalGroup } from './groups';

	type Props = {
		/** Called when the user picks a group from the suggestions. */
		onSelect: (group: LocalGroup) => void;
		class?: string;
	};

	let { onSelect, class: className }: Props = $props();

	let query = $state('');
	let open = $state(false);
	let value = $state('');
	let field = $state<HTMLElement | null>(null);

	const results = $derived(searchGroups(query));

	function handleInput(event: Event & { currentTarget: HTMLInputElement }) {
		query = event.currentTarget.value;
		// Suggestions appear as soon as there is something to match, and hide when cleared.
		open = query.trim() !== '';
	}

	// Coming back to the field (focus or click) shows the suggestions for what's already typed.
	function reopen() {
		if (query.trim() !== '') open = true;
	}

	function handleValueChange(id: string) {
		const group = groups.find((g) => g.id === id);
		if (!group) return;
		query = group.city;
		onSelect(group);
	}
</script>

<Combobox.Root
	type="single"
	bind:open
	bind:value
	inputValue={query}
	onValueChange={handleValueChange}
>
	<!-- A label, so clicking anywhere on the field (padding, icon) focuses the input. -->
	<label
		bind:this={field}
		class={cn(
			'flex cursor-text items-center gap-2 rounded-3xl border bg-background p-2.5 transition-shadow focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 lg:min-h-18 lg:gap-2.5 lg:p-3',
			className
		)}
	>
		<img src={searchIcon} alt="" width="18" height="18" class="shrink-0" />
		<Combobox.Input
			oninput={handleInput}
			onfocus={reopen}
			onclick={reopen}
			placeholder={m.find_group_search_placeholder()}
			aria-label={m.find_group_search_label()}
			class="min-w-0 flex-1 bg-transparent text-small text-foreground outline-none placeholder:text-muted-foreground"
		/>
	</label>

	<Combobox.Portal>
		<Combobox.Content
			customAnchor={field}
			sideOffset={6}
			class="z-50 max-h-80 w-(--bits-floating-anchor-width) overflow-y-auto rounded-2xl border bg-popover p-1.5 text-popover-foreground shadow-lg data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0"
		>
			<Combobox.Viewport>
				{#each results as group (group.id)}
					<Combobox.Item
						value={group.id}
						label={group.city}
						class="flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2.5 outline-none data-highlighted:bg-muted"
					>
						<span class="flex flex-col">
							<span class="text-small font-bold text-foreground">{group.city}</span>
							<span class="text-caption text-muted-foreground">{groupArea(group)}</span>
						</span>
						<img
							src={group.kind === 'project' ? legendProject : legendLocal}
							alt=""
							width="12"
							height="12"
						/>
					</Combobox.Item>
				{:else}
					<p class="px-3 py-2.5 text-small text-muted-foreground">
						{m.find_group_search_empty({ query: query.trim() })}
					</p>
				{/each}
			</Combobox.Viewport>
		</Combobox.Content>
	</Combobox.Portal>
</Combobox.Root>

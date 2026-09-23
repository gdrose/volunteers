<script lang="ts">
	import Globe from '@lucide/svelte/icons/globe';
	import ChevronDown from '@lucide/svelte/icons/chevron-down';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { cn } from '$lib/utils.js';
	import { getLocale, locales, setLocale, type Locale } from '$lib/paraglide/runtime';

	const localeMeta: Record<Locale, { label: string; flag: string }> = {
		en: { label: 'English', flag: '🇬🇧' },
		es: { label: 'Español', flag: '🇪🇸' },
		it: { label: 'Italiano', flag: '🇮🇹' },
		ja: { label: '日本語', flag: '🇯🇵' },
		nl: { label: 'Nederlands', flag: '🇳🇱' }
	};

	const sizeStyles = {
		sm: { gap: 'gap-1', text: 'text-xs', weight: 'font-semibold', icon: 'size-[18px]', chevron: 'size-[18px]' },
		default: { gap: 'gap-1', text: 'text-sm', weight: 'font-semibold', icon: 'size-4', chevron: 'size-3.5' },
		lg: { gap: 'gap-2', text: 'text-base', weight: 'font-extrabold', icon: 'size-5', chevron: 'size-5' }
	} as const;

	let {
		size = 'default',
		class: className
	}: { size?: keyof typeof sizeStyles; class?: string } = $props();

	let open = $state(false);
	let currentLocale = $derived(getLocale());
	let s = $derived(sizeStyles[size]);
</script>

<DropdownMenu.Root bind:open>
	<DropdownMenu.Trigger
		class={cn('inline-flex items-center text-foreground outline-none', s.gap, s.text, s.weight, className)}
	>
		<Globe class={s.icon} />
		{localeMeta[currentLocale].label}
		<ChevronDown class={cn(s.chevron, 'transition-transform duration-200', open && 'rotate-180')} />
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="start">
		<DropdownMenu.RadioGroup value={currentLocale} onValueChange={(value) => setLocale(value as Locale)}>
			{#each locales as locale (locale)}
				<DropdownMenu.RadioItem value={locale}>
					<span aria-hidden="true">{localeMeta[locale].flag}</span>
					{localeMeta[locale].label}
				</DropdownMenu.RadioItem>
			{/each}
		</DropdownMenu.RadioGroup>
	</DropdownMenu.Content>
</DropdownMenu.Root>

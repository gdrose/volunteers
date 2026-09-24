<script lang="ts">
	import type { Pathname } from '$app/types';
	import { resolve } from '$app/paths';
	import Menu from '@lucide/svelte/icons/menu';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import LanguageSwitcher from './language-switcher.svelte';
	import instagramLogo from '$lib/assets/social/color/instagram.svg';
	import tiktokLogo from '$lib/assets/social/color/tiktok.svg';
	import linkedinLogo from '$lib/assets/social/color/linkedin.svg';
	import whatsappLogo from '$lib/assets/social/color/whatsapp.svg';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages.js';

	const navLinks = [
		{ label: m.nav_about, path: '/about' },
		{ label: m.nav_what_we_do, path: '/what-we-do' },
		{ label: m.nav_news, path: '/news' }
	] as const;

	const findGroupPath = '/find-a-group';

	const socialLinks = [
		{ name: 'Instagram', icon: instagramLogo },
		{ name: 'TikTok', icon: tiktokLogo },
		{ name: 'LinkedIn', icon: linkedinLogo },
		{ name: 'WhatsApp', icon: whatsappLogo }
	];

	let open = $state(false);
</script>

{#snippet menuRow(path: string, label: string, highlight = false)}
	<a
		href={resolve(localizeHref(path) as Pathname)}
		onclick={() => (open = false)}
		class={[
			'flex h-[58px] w-full items-center justify-between border-b border-border text-h2',
			highlight ? 'text-primary' : 'text-foreground'
		]}
	>
		{label}
		<ArrowRight class={highlight ? 'size-6 text-primary' : 'size-6 text-link'} />
	</a>
{/snippet}

<div
	class="flex w-full items-center justify-center border-b border-border bg-muted px-4 py-2 lg:hidden"
>
	<p class="text-h4 font-black text-primary uppercase">{m.nav_donate_now()}</p>
</div>

<div
	class="sticky top-0 z-40 flex w-full items-center justify-between border-b border-border bg-background px-4 py-3 lg:hidden"
>
	<div class="flex flex-1 justify-start">
		<LanguageSwitcher size="sm" />
	</div>

	<a href={resolve(localizeHref('/') as Pathname)} class="flex shrink-0 items-center">
		<img src="/wordmark.svg" alt="Volunteers" class="h-6 w-auto" />
	</a>

	<div class="flex flex-1 justify-end">
		<Sheet.Root bind:open>
			<Sheet.Trigger
				class="inline-flex items-center gap-1.5 text-small font-bold text-foreground outline-none"
			>
				<Menu class="size-[18px]" />
				{m.nav_menu()}
			</Sheet.Trigger>
			<Sheet.Content
				side="right"
				class="w-full gap-0 p-0 data-[side=right]:w-full data-[side=right]:border-l-0 data-[side=right]:sm:max-w-full"
			>
				<div class="flex h-full flex-col items-center overflow-y-auto py-6">
					<a href={resolve(localizeHref('/') as Pathname)} onclick={() => (open = false)}>
						<img src="/wordmark.svg" alt="Volunteers" class="h-6 w-auto" />
					</a>

					<div class="flex w-full flex-1 flex-col gap-6 px-5 py-8">
						<LanguageSwitcher size="lg" class="w-full justify-center rounded-2xl bg-muted py-2" />

						<nav class="flex w-full flex-col border-t border-border">
							{#each navLinks as link (link.path)}
								{@render menuRow(link.path, link.label())}
							{/each}
							{@render menuRow(findGroupPath, m.nav_find_group(), true)}
						</nav>

						<Button variant="soft" size="lg" class="w-full" onclick={() => (open = false)}>
							{m.nav_donate()}
						</Button>

						<div class="flex-1"></div>

						<div class="flex w-full flex-col gap-4">
							<div class="h-px w-full bg-border" aria-hidden="true"></div>

							<div class="flex w-full flex-col items-center gap-3 rounded-2xl bg-muted px-4 py-6">
								<p class="text-center text-small font-semibold text-foreground">
									{m.footer_social_text()}
								</p>
								<div class="flex items-center justify-center gap-3">
									{#each socialLinks as social (social.name)}
										<span
											class="flex shrink-0 items-center justify-center rounded-full bg-white p-2.5"
										>
											<img src={social.icon} alt={social.name} class="size-5" />
										</span>
									{/each}
								</div>
							</div>

							<p class="text-center text-caption text-muted-foreground">
								{m.footer_copyright({ year: new Date().getFullYear() })}
							</p>
						</div>
					</div>
				</div>
			</Sheet.Content>
		</Sheet.Root>
	</div>
</div>

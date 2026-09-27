<script lang="ts">
	import type { Pathname } from '$app/types';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import Menu from '@lucide/svelte/icons/menu';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import LanguageSwitcher from './language-switcher.svelte';
	import { donateLink, findGroupLink, mainLinks, navCurrent, type NavLink } from './nav-links';
	import { socialLinks, type SocialProfile } from '$lib/components/shared';
	import instagramLogo from '$lib/assets/social/color/instagram.svg';
	import tiktokLogo from '$lib/assets/social/color/tiktok.svg';
	import linkedinLogo from '$lib/assets/social/color/linkedin.svg';
	import whatsappLogo from '$lib/assets/social/color/whatsapp.svg';
	import { deLocalizeUrl, localizeHref } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages.js';

	let { socials: profiles }: { socials: SocialProfile[] } = $props();

	const socials = $derived(
		socialLinks(profiles, {
			instagram: instagramLogo,
			tiktok: tiktokLogo,
			linkedin: linkedinLogo,
			whatsapp: whatsappLogo
		})
	);

	const currentPath = $derived(deLocalizeUrl(page.url).pathname);

	let open = $state(false);
</script>

{#snippet menuRow(link: NavLink, highlight = false)}
	<!-- Current section: underlined like the desktop nav. -->
	<a
		href={resolve(localizeHref(link.path) as Pathname)}
		aria-current={navCurrent(currentPath, link.path)}
		onclick={() => (open = false)}
		class={[
			'flex h-14 w-full items-center justify-between border-b border-border text-h2 decoration-primary decoration-2 underline-offset-8 aria-[current]:underline',
			highlight ? 'text-primary' : 'text-foreground'
		]}
	>
		{link.label()}
		<ArrowRight class={highlight ? 'size-6 text-primary' : 'size-6 text-link'} />
	</a>
{/snippet}

<a
	href={resolve(localizeHref(donateLink.path) as Pathname)}
	class="flex w-full items-center justify-center border-b border-border bg-muted px-4 py-2 text-h4 font-black text-primary uppercase lg:hidden"
>
	{m.nav_donate_now()}
</a>

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
				class="inline-flex min-h-6 items-center gap-1.5 rounded-sm px-1 text-small font-bold text-foreground"
			>
				<Menu class="size-4.5" />
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
							{#each mainLinks as link (link.path)}
								{@render menuRow(link)}
							{/each}
							{@render menuRow(findGroupLink, true)}
						</nav>

						<Button
							href={resolve(localizeHref(donateLink.path) as Pathname)}
							variant="soft"
							size="lg"
							class="w-full"
							onclick={() => (open = false)}
						>
							{donateLink.label()}
						</Button>

						<div class="flex-1"></div>

						<div class="flex w-full flex-col gap-4">
							<div class="h-px w-full bg-border" aria-hidden="true"></div>

							<div class="flex w-full flex-col items-center gap-3 rounded-2xl bg-muted px-4 py-6">
								<p class="text-center text-small font-semibold text-foreground">
									{m.footer_social_text()}
								</p>
								<div class="flex items-center justify-center gap-3">
									{#each socials as social (social.id)}
										<!-- eslint-disable svelte/no-navigation-without-resolve -- external profile URL -->
										<a
											href={social.url}
											target="_blank"
											rel="noopener noreferrer"
											aria-label={social.name}
											class="flex shrink-0 items-center justify-center rounded-full bg-white p-2.5 transition-opacity hover:opacity-80"
										>
											<img src={social.icon} alt="" class="size-5" />
										</a>
										<!-- eslint-enable svelte/no-navigation-without-resolve -->
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

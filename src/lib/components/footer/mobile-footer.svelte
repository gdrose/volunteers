<script lang="ts">
	import type { Pathname } from '$app/types';
	import { resolve } from '$app/paths';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages.js';
	import visFoundationLogo from '$lib/assets/footer/vis-foundation.png';

	const columns = [
		{
			title: 'Volunteers',
			links: [
				{ label: m.nav_about, path: '/about' },
				{ label: m.nav_what_we_do, path: '/what-we-do' }
			]
		},
		{
			title: m.footer_what_you_can_do,
			links: [
				{ label: m.footer_volunteer, path: '/volunteer' },
				{ label: m.nav_donate, path: '/donate' }
			]
		},
		{
			title: m.footer_contacts,
			links: [
				{ label: m.footer_contact_us, path: '/contact' },
				{ label: m.footer_locations, path: '/locations' },
				{ label: m.footer_media_kit, path: '/media-kit' }
			]
		}
	] as const;
</script>

<footer
	class="flex w-full flex-col gap-8 border-t border-border bg-background px-6 py-10 lg:hidden"
>
	<a href={resolve(localizeHref('/') as Pathname)} class="flex items-center justify-center">
		<img src="/wordmark.svg" alt="Volunteers" class="h-6 w-auto" />
	</a>

	<div class="flex flex-col gap-6 text-sm">
		{#each columns as column (column.title)}
			<div class="flex flex-col gap-2">
				<p class="font-extrabold text-primary">
					{typeof column.title === 'string' ? column.title : column.title()}
				</p>
				{#each column.links as link (link.path)}
					<a
						href={resolve(localizeHref(link.path) as Pathname)}
						class="font-medium text-foreground"
					>
						{link.label()}
					</a>
				{/each}
			</div>
		{/each}
	</div>

	<div class="flex flex-col gap-3 pt-3">
		<div class="flex items-center gap-3">
			<img src={visFoundationLogo} alt="VIS Foundation" class="size-8.5 object-cover" />
			<span
				class="inline-flex items-center rounded bg-foreground px-2.5 py-1 text-[10px] font-black whitespace-nowrap text-background"
			>
				<span class="text-[#ffbf00]">VIS </span>FOUNDATION
			</span>
		</div>
		<p class="text-xs text-muted-foreground">
			{m.footer_copyright_short({ year: new Date().getFullYear() })}
		</p>
	</div>
</footer>

<script lang="ts">
	import { Container, PageBreadcrumb } from '$lib/components/shared';
	import { stats } from '$lib/components/stats';
	import volunteersImage from '$lib/assets/about/volunteers.png';
	import { m } from '$lib/paraglide/messages.js';
</script>

<Container
	as="section"
	aria-labelledby="about-title"
	class="flex flex-col gap-6 pt-6 pb-10 lg:gap-8 lg:pt-10 lg:pb-20"
>
	<PageBreadcrumb crumbs={[{ label: m.nav_about() }]} />

	<div class="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-16">
		<div class="flex flex-col gap-5 lg:min-w-0 lg:flex-1 lg:gap-6">
			<h1 id="about-title" class="text-display text-foreground">
				{m.about_title()}
				<span class="text-primary">{m.about_title_highlight()}</span>
			</h1>

			<p class="text-h3 font-bold text-foreground">
				{m.about_lead()}
			</p>

			<p class="text-lead text-muted-foreground">
				{m.about_body()}
			</p>

			<dl class="flex gap-2 lg:gap-7">
				{#each stats as stat (stat.id)}
					<div class="flex min-w-0 flex-1 flex-col gap-1">
						<dt class="order-2 text-caption font-semibold text-muted-foreground">
							{stat.label()}
						</dt>
						<dd class="order-1 text-h2 whitespace-nowrap text-primary">
							{stat.value}
						</dd>
					</div>
				{/each}
			</dl>
		</div>

		<img
			src={volunteersImage}
			alt={m.about_image_alt()}
			width="554"
			height="368"
			class="h-65 w-full rounded-[16px] object-cover lg:h-125 lg:w-130 lg:shrink-0 lg:rounded-[24px]"
		/>
	</div>
</Container>

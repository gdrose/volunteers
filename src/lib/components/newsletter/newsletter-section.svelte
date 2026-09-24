<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Container } from '$lib/components/shared';
	import { Input } from '$lib/components/ui/input/index.js';
	import { m } from '$lib/paraglide/messages.js';
	import titleUnderline from '$lib/assets/newsletter/title-underline.svg';
	import titleDecoration from '$lib/assets/newsletter/title-decoration.svg';
	import newsletterCircle from '$lib/assets/newsletter/newsletter-circle.svg';
	import checkCircle from '$lib/assets/newsletter/check-circle.svg';
	import checkCircleSm from '$lib/assets/newsletter/check-circle-sm.svg';

	// TODO: wire up to the newsletter provider once available.
	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
	}
</script>

<section aria-labelledby="newsletter-title" class="w-full bg-muted lg:bg-background">
	<Container class="py-5 lg:py-8">
		<div
			class="mx-auto flex w-full max-w-218 flex-col gap-4 rounded-[16px] bg-primary p-5 text-primary-foreground sm:gap-5 sm:p-6 lg:gap-[25px] lg:rounded-[12px] lg:px-[117px] lg:pt-[49px] lg:pb-10"
		>
			<div class="flex flex-col gap-4 sm:gap-5 lg:gap-2.5 lg:text-center">
				<h2
					id="newsletter-title"
					class="text-xl leading-6 font-extrabold sm:text-[22px] sm:leading-[26px] lg:px-2 lg:text-[32px] lg:leading-[35px] lg:font-semibold lg:tracking-[-0.02em]"
				>
					{m.newsletter_title_start()}
					<span class="relative inline-block">
						{m.newsletter_title_highlight()}
						<img
							src={titleUnderline}
							alt=""
							width="82"
							height="7.76709"
							class="absolute top-[29.5px] left-1/2 hidden max-w-none -translate-x-1/2 lg:block"
						/>
					</span>
					{m.newsletter_title_end()}
					<span class="hidden lg:inline"
						>{m.newsletter_title_end_desktop()}<span
							class="relative ml-0.5 inline-block h-[35px] w-[7.5px] align-top"
						>
							<img
								src={titleDecoration}
								alt=""
								width="10.509"
								height="33.7539"
								class="absolute top-[2.3px] -left-[1.5px] max-w-none"
							/>
						</span>
					</span>
				</h2>
				<p class="text-[13px] leading-[18px] opacity-90 lg:hidden">
					{m.newsletter_description_short()}
				</p>
				<p class="hidden text-sm leading-5 font-medium tracking-[-0.01em] lg:block">
					{m.newsletter_description_start()}
					<span class="relative inline-block">
						{m.newsletter_description_highlight()}
						<img
							src={newsletterCircle}
							alt=""
							width="82.9999"
							height="28"
							class="absolute -top-[4.5px] left-1/2 max-w-none -translate-x-1/2"
						/>
					</span>
					{m.newsletter_description_end()}
				</p>
			</div>

			<form
				class="flex flex-col gap-4 sm:gap-5 lg:mx-auto lg:w-full lg:max-w-[534px] lg:gap-3.5"
				onsubmit={handleSubmit}
			>
				<Input
					type="email"
					name="email"
					autocomplete="email"
					required
					variant="inverse"
					size="form"
					placeholder={m.newsletter_email_placeholder()}
					aria-label={m.newsletter_email_label()}
				/>
				<div
					class="flex flex-col gap-4 sm:gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-6 lg:pr-2"
				>
					<p class="flex items-start gap-2 lg:max-w-[273px] lg:gap-[3px]">
						<img src={checkCircle} alt="" width="16" height="16" class="shrink-0 lg:hidden" />
						<img
							src={checkCircleSm}
							alt=""
							width="12"
							height="12"
							class="hidden shrink-0 lg:block"
						/>
						<span
							class="text-[9px] leading-[13px] sm:text-[10px] sm:leading-[14px] lg:pt-px lg:text-[8px] lg:leading-[10px] lg:font-semibold lg:tracking-[-0.02em]"
						>
							{m.newsletter_consent()}
						</span>
					</p>
					<Button type="submit" variant="inverse" size="form" class="w-full lg:-mt-px lg:w-auto">
						{m.newsletter_submit()}
					</Button>
				</div>
			</form>
		</div>
	</Container>
</section>

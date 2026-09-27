<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Container } from '$lib/components/shared';
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import type { Pathname } from '$app/types';
	import { resolve } from '$app/paths';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages.js';
	import titleUnderline from '$lib/assets/newsletter/title-underline.svg';
	import titleDecoration from '$lib/assets/newsletter/title-decoration.svg';
	import newsletterCircle from '$lib/assets/newsletter/newsletter-circle.svg';

	let consent = $state(false);
	// Set when the user tries to subscribe without consenting: shakes the
	// consent row, marks the checkbox invalid and opens the reminder tooltip.
	let reminder = $state(false);
	let shaking = $state(false);
	let reminderTimeout: ReturnType<typeof setTimeout> | undefined;

	$effect(() => {
		if (consent) reminder = false;
	});

	$effect(() => () => clearTimeout(reminderTimeout));

	// TODO: wire up to the newsletter provider once available, then enable the submit button.
	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		if (!consent) {
			remindConsent();
			return;
		}
	}

	function remindConsent() {
		reminder = true;
		shaking = true;
		clearTimeout(reminderTimeout);
		reminderTimeout = setTimeout(() => (reminder = false), 4000);
	}
</script>

<section aria-labelledby="newsletter-title" class="w-full bg-muted lg:bg-background">
	<Container class="py-5 lg:py-8">
		<Card.Root variant="brand" class="mx-auto w-full max-w-218">
			<div class="flex flex-col gap-4 sm:gap-5 lg:gap-2.5 lg:text-center">
				<h2 id="newsletter-title" class="text-h2 lg:px-2">
					{m.newsletter_title_start()}
					<span class="relative inline-block">
						{m.newsletter_title_highlight()}
						<img
							src={titleUnderline}
							alt=""
							width="82"
							height="7.76709"
							class="absolute top-[31px] left-1/2 hidden max-w-none -translate-x-1/2 lg:block"
						/>
					</span>
					{m.newsletter_title_end()}
					<span class="hidden lg:inline"
						>{m.newsletter_title_end_desktop()}<span
							class="relative ml-0.5 inline-block h-[38px] w-[7.5px] align-top"
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
				<p class="text-small lg:font-medium">
					{m.newsletter_description_start()}
					<span class="relative inline-block">
						{m.newsletter_description_highlight()}
						<img
							src={newsletterCircle}
							alt=""
							width="82.9999"
							height="28"
							class="absolute -top-[4.5px] left-1/2 hidden max-w-none -translate-x-1/2 lg:block"
						/>
					</span>
					{m.newsletter_description_end()}
				</p>
			</div>

			<form
				class="flex flex-col gap-4 sm:gap-5 lg:mx-auto lg:w-full lg:max-w-134 lg:gap-3.5"
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
					<div
						class={['flex items-start gap-2 lg:max-w-68', shaking && 'motion-safe:animate-shake']}
						onanimationend={() => (shaking = false)}
					>
						<Tooltip.Provider>
							<!-- Only opens as a reminder, never on hover. -->
							<Tooltip.Root bind:open={() => reminder, (open) => !open && (reminder = false)}>
								<Tooltip.Trigger>
									{#snippet child({ props })}
										<Checkbox
											{...props}
											id="newsletter-consent"
											name="consent"
											variant="inverse"
											bind:checked={consent}
											aria-invalid={reminder || undefined}
											aria-describedby={reminder ? 'newsletter-consent-reminder' : undefined}
										/>
									{/snippet}
								</Tooltip.Trigger>
								<Tooltip.Content
									id="newsletter-consent-reminder"
									variant="destructive"
									side="top"
									align="start"
									sideOffset={6}
								>
									{m.newsletter_consent_required()}
								</Tooltip.Content>
							</Tooltip.Root>
						</Tooltip.Provider>
						<label for="newsletter-consent" class="cursor-pointer text-caption">
							{m.newsletter_consent_before()}<a
								href={resolve(localizeHref('/privacy') as Pathname)}
								class="font-semibold underline underline-offset-2">{m.newsletter_consent_link()}</a
							>{m.newsletter_consent_after()}
						</label>
					</div>
					<!-- TODO: enable once a newsletter provider is wired up in handleSubmit. -->
					<Button
						type="submit"
						variant="inverse"
						disabled
						aria-describedby="newsletter-coming-soon"
						class="w-full lg:-mt-px lg:w-auto"
					>
						{m.newsletter_submit()}
					</Button>
				</div>
				<p id="newsletter-coming-soon" class="text-caption font-semibold">
					{m.newsletter_coming_soon()}
				</p>
			</form>
		</Card.Root>
	</Container>
</section>

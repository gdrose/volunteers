<script lang="ts">
	import { Container } from '$lib/components/shared';
	import * as Item from '$lib/components/ui/item/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import fileIcon from '$lib/assets/about/documents/file.svg';
	import downloadIcon from '$lib/assets/about/documents/download.svg';
	import { documents } from './documents';
	import { m } from '$lib/paraglide/messages.js';
</script>

<section aria-labelledby="documents-title" class="w-full bg-background">
	<Container class="flex flex-col gap-7 pt-10 pb-12 lg:gap-9 lg:py-20">
		<header class="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
			<h2 id="documents-title" class="text-h1 text-foreground">
				{m.about_documents_title()}
				<span class="text-primary">{m.about_documents_title_highlight()}</span>
			</h2>
			<p class="text-lead text-muted-foreground lg:max-w-115">
				{m.about_documents_description()}
			</p>
		</header>

		<Item.Group>
			{#each documents as document (document.id)}
				<Item.Root role="listitem" variant="divided" size="document">
					<Item.Media variant="tile">
						<img src={fileIcon} alt="" width="20" height="20" />
					</Item.Media>
					<Item.Content>
						<Item.Title role="heading" aria-level={3}>{document.title()}</Item.Title>
						<Item.Description>
							{document.format} ·
							{m.about_documents_updated({ year: document.updatedYear })}
						</Item.Description>
					</Item.Content>
					<Item.Actions>
						<Button
							href={document.href}
							download
							variant="outline"
							size="download"
							class="w-full lg:w-auto"
						>
							<img src={downloadIcon} alt="" width="16" height="16" data-icon="inline-start" />
							{m.about_documents_download()}
						</Button>
					</Item.Actions>
				</Item.Root>
			{/each}
		</Item.Group>
	</Container>
</section>

import { m } from '$lib/paraglide/messages.js';

export type FoundationDocument = {
	id: string;
	title: () => string;
	/** Public URL of the file, served from `static/`. */
	href: string;
	format: string;
	updatedYear: number;
};

// TODO: add the PDF to static/documents/ — the link 404s until the file is published.
export const documents: FoundationDocument[] = [
	{
		id: 'statute',
		title: m.about_documents_statute_title,
		href: '/documents/statuto-fondazione.pdf',
		format: 'PDF',
		updatedYear: 2026
	}
];

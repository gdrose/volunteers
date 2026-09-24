import { m } from '$lib/paraglide/messages.js';
import citizensImage from '$lib/assets/projects/citizens.png';
import childrenImage from '$lib/assets/projects/children.jpg';
import medicalImage from '$lib/assets/projects/medical.jpg';
import internationalImage from '$lib/assets/projects/international.jpg';

export type ProjectId = 'citizens' | 'children' | 'medical' | 'international';

export type Project = {
	id: ProjectId;
	title: () => string;
	description: () => string;
	image: string;
	/** Per-breakpoint crop of the cover image (object-position). */
	imageClass?: string;
};

export const projects: Project[] = [
	{
		id: 'citizens',
		title: m.projects_citizens_title,
		description: m.projects_citizens_description,
		image: citizensImage
	},
	{
		id: 'children',
		title: m.projects_children_title,
		description: m.projects_children_description,
		image: childrenImage,
		imageClass: 'object-[50%_27%] lg:object-[50%_13%]'
	},
	{
		id: 'medical',
		title: m.projects_medical_title,
		description: m.projects_medical_description,
		image: medicalImage,
		imageClass: 'lg:object-[50%_59%]'
	},
	{
		id: 'international',
		title: m.projects_international_title,
		description: m.projects_international_description,
		image: internationalImage,
		imageClass: 'lg:object-[50%_55%]'
	}
];

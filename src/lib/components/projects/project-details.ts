import { m } from '$lib/paraglide/messages.js';
import type { ProjectId } from './projects';
import leafIcon from '$lib/assets/icons/leaf.svg';
import usersIcon from '$lib/assets/icons/users.svg';
import recycleIcon from '$lib/assets/icons/recycle.svg';
import calendarIcon from '$lib/assets/icons/calendar.svg';
import citizensHeader from '$lib/assets/projects/citizens/header.png';
import citizensCleanup from '$lib/assets/projects/citizens/gallery-cleanup.png';
import citizensWorkshop from '$lib/assets/projects/citizens/gallery-workshop.png';
import citizensFoodDrive from '$lib/assets/projects/citizens/gallery-food-drive.png';
import activeCitizenship from '$lib/assets/projects/citizens/resources/active-citizenship.png';
import participatoryBudget from '$lib/assets/projects/citizens/resources/participatory-budget.png';
import communityWorkshop from '$lib/assets/projects/citizens/resources/community-workshop.png';
import urbanCareStories from '$lib/assets/projects/citizens/resources/urban-care-stories.png';
import communicationChecklist from '$lib/assets/projects/citizens/resources/communication-checklist.png';
import facilitatingMeetings from '$lib/assets/projects/citizens/resources/facilitating-meetings.png';

type Message = () => string;

export type ProjectImage = {
	src: string;
	alt: Message;
	/** object-position crop matching the design. */
	position?: string;
};

export type ProjectActivity = { id: string; icon: string; label: Message };

export type ResourceKind = 'book' | 'document' | 'video';

export type ProjectResource = {
	id: string;
	kind: ResourceKind;
	title: Message;
	description: Message;
	/** Shorter copy used on mobile. */
	shortDescription: Message;
	cover: string;
	/** TODO: link each resource once the files/videos are published. */
	href?: string;
};

export type ProjectPartner = { name: string; initial: string };

export type ProjectDetail = {
	id: ProjectId;
	/** Breadcrumb label; reuses the landing-page project title. */
	name: Message;
	titleStart: Message;
	titleHighlight: Message;
	summary: Message;
	header: ProjectImage;
	intro: Message;
	paragraphs: Message[];
	gallery: ProjectImage[];
	activities: ProjectActivity[];
	resources: ProjectResource[];
	partners: ProjectPartner[];
};

export const projectDetails: ProjectDetail[] = [
	{
		id: 'citizens',
		name: m.projects_citizens_title,
		titleStart: m.project_citizens_title_start,
		titleHighlight: m.project_citizens_title_highlight,
		summary: m.project_citizens_summary,
		header: {
			src: citizensHeader,
			alt: m.project_citizens_gallery_group,
			position: 'object-[center_52%]'
		},
		intro: m.project_citizens_intro,
		paragraphs: [m.project_citizens_description, m.project_citizens_approach],
		gallery: [
			{
				src: citizensCleanup,
				alt: m.project_citizens_gallery_cleanup,
				position: 'object-[20%_center]'
			},
			{ src: citizensWorkshop, alt: m.project_citizens_gallery_workshop },
			{ src: citizensHeader, alt: m.project_citizens_gallery_group, position: 'object-left-top' },
			{ src: citizensFoodDrive, alt: m.project_citizens_gallery_food_drive }
		],
		activities: [
			{ id: 'greenery', icon: leafIcon, label: m.project_citizens_activity_greenery },
			{ id: 'workshops', icon: usersIcon, label: m.project_citizens_activity_workshops },
			{ id: 'recycling', icon: recycleIcon, label: m.project_citizens_activity_recycling },
			{ id: 'events', icon: calendarIcon, label: m.project_citizens_activity_events }
		],
		resources: [
			{
				id: 'guide',
				kind: 'book',
				title: m.project_citizens_resource_guide_title,
				description: m.project_citizens_resource_guide_description,
				shortDescription: m.project_citizens_resource_guide_description_short,
				cover: activeCitizenship
			},
			{
				id: 'budget',
				kind: 'document',
				title: m.project_citizens_resource_budget_title,
				description: m.project_citizens_resource_budget_description,
				shortDescription: m.project_citizens_resource_budget_description_short,
				cover: participatoryBudget
			},
			{
				id: 'workshop',
				kind: 'video',
				title: m.project_citizens_resource_workshop_title,
				description: m.project_citizens_resource_workshop_description,
				shortDescription: m.project_citizens_resource_workshop_description_short,
				cover: communityWorkshop
			},
			{
				id: 'stories',
				kind: 'book',
				title: m.project_citizens_resource_stories_title,
				description: m.project_citizens_resource_stories_description,
				shortDescription: m.project_citizens_resource_stories_description_short,
				cover: urbanCareStories
			},
			{
				id: 'checklist',
				kind: 'document',
				title: m.project_citizens_resource_checklist_title,
				description: m.project_citizens_resource_checklist_description,
				shortDescription: m.project_citizens_resource_checklist_description_short,
				cover: communicationChecklist
			},
			{
				id: 'facilitation',
				kind: 'video',
				title: m.project_citizens_resource_facilitation_title,
				description: m.project_citizens_resource_facilitation_description,
				shortDescription: m.project_citizens_resource_facilitation_description_short,
				cover: facilitatingMeetings
			}
		],
		partners: [
			{ name: 'VIS Foundation', initial: 'V' },
			{ name: 'Comune di Milano', initial: 'C' },
			{ name: 'Ass. Quartieri', initial: 'A' }
		]
	}
];

export function getProjectDetail(id: string) {
	return projectDetails.find((project) => project.id === id);
}

import { m } from '$lib/paraglide/messages.js';
import type { ProjectId } from './projects';
import leafIcon from '$lib/assets/icons/leaf.svg';
import usersIcon from '$lib/assets/icons/users.svg';
import recycleIcon from '$lib/assets/icons/recycle.svg';
import calendarIcon from '$lib/assets/icons/calendar.svg';
import bookOpenIcon from '$lib/assets/icons/book-open.svg';
import puzzleIcon from '$lib/assets/icons/puzzle.svg';
import hospitalIcon from '$lib/assets/icons/hospital.svg';
import graduationCapIcon from '$lib/assets/icons/graduation-cap.svg';
import heartHandshakeIcon from '$lib/assets/icons/heart-handshake.svg';
import dropletIcon from '$lib/assets/icons/droplet.svg';
import stethoscopeIcon from '$lib/assets/icons/stethoscope.svg';
import megaphoneIcon from '$lib/assets/icons/megaphone.svg';
import tentIcon from '$lib/assets/icons/tent.svg';
import sirenIcon from '$lib/assets/icons/siren.svg';
import globeIcon from '$lib/assets/icons/globe.svg';
import languagesIcon from '$lib/assets/icons/languages.svg';
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
// Children, Healthcare and International have no dedicated shoots yet: they reuse
// the landing and news photos, which also stand in as resource covers.
import childrenImage from '$lib/assets/projects/children.jpg';
import heroImage from '$lib/assets/hero/hero.png';
import youthRecordImage from '$lib/assets/news/youth-record.jpg';
import palermoWorkshopsImage from '$lib/assets/news/palermo-workshops.jpg';
import medicalImage from '$lib/assets/projects/medical.jpg';
import clownTherapyImage from '$lib/assets/news/clown-therapy.jpg';
import avisBolognaImage from '$lib/assets/news/avis-bologna.png';
import internationalImage from '$lib/assets/projects/international.jpg';
import rotterdamImage from '$lib/assets/news/rotterdam.jpg';
import milanMealsImage from '$lib/assets/news/milan-meals.jpg';

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
	},
	{
		id: 'children',
		name: m.projects_children_title,
		titleStart: m.project_children_title_start,
		titleHighlight: m.project_children_title_highlight,
		summary: m.project_children_summary,
		header: {
			src: childrenImage,
			alt: m.what_we_do_children_alt_play,
			position: 'object-[50%_27%]'
		},
		intro: m.project_children_intro,
		paragraphs: [m.project_children_description, m.project_children_approach],
		gallery: [
			{ src: heroImage, alt: m.project_children_gallery_play },
			{ src: youthRecordImage, alt: m.what_we_do_children_alt_group },
			{ src: childrenImage, alt: m.what_we_do_children_alt_play, position: 'object-[50%_30%]' },
			{ src: palermoWorkshopsImage, alt: m.what_we_do_children_alt_mural }
		],
		activities: [
			{ id: 'homework', icon: bookOpenIcon, label: m.project_children_activity_homework },
			{ id: 'play', icon: puzzleIcon, label: m.project_children_activity_play },
			{ id: 'wards', icon: hospitalIcon, label: m.project_children_activity_wards },
			{ id: 'camps', icon: graduationCapIcon, label: m.project_children_activity_camps }
		],
		resources: [
			{
				id: 'homework',
				kind: 'book',
				title: m.project_children_resource_homework_title,
				description: m.project_children_resource_homework_description,
				shortDescription: m.project_children_resource_homework_description_short,
				cover: youthRecordImage
			},
			{
				id: 'safeguarding',
				kind: 'document',
				title: m.project_children_resource_safeguarding_title,
				description: m.project_children_resource_safeguarding_description,
				shortDescription: m.project_children_resource_safeguarding_description_short,
				cover: childrenImage
			},
			{
				id: 'games',
				kind: 'video',
				title: m.project_children_resource_games_title,
				description: m.project_children_resource_games_description,
				shortDescription: m.project_children_resource_games_description_short,
				cover: heroImage
			},
			{
				id: 'workshops',
				kind: 'book',
				title: m.project_children_resource_workshops_title,
				description: m.project_children_resource_workshops_description,
				shortDescription: m.project_children_resource_workshops_description_short,
				cover: palermoWorkshopsImage
			}
		],
		// TODO: confirm the real partners of each project.
		partners: [
			{ name: 'VIS Foundation', initial: 'V' },
			{ name: 'Comune di Catania', initial: 'C' },
			{ name: 'Scuole di Palermo', initial: 'S' }
		]
	},
	{
		id: 'medical',
		name: m.projects_medical_title,
		titleStart: m.project_medical_title_start,
		titleHighlight: m.project_medical_title_highlight,
		summary: m.project_medical_summary,
		header: {
			src: medicalImage,
			alt: m.what_we_do_medical_alt_ward,
			position: 'object-[50%_55%]'
		},
		intro: m.project_medical_intro,
		paragraphs: [m.project_medical_description, m.project_medical_approach],
		gallery: [
			{ src: clownTherapyImage, alt: m.what_we_do_medical_alt_clown },
			{ src: medicalImage, alt: m.what_we_do_medical_alt_ward, position: 'object-[50%_55%]' },
			{ src: avisBolognaImage, alt: m.what_we_do_medical_alt_blood }
		],
		activities: [
			{ id: 'visits', icon: heartHandshakeIcon, label: m.project_medical_activity_visits },
			{ id: 'blood', icon: dropletIcon, label: m.project_medical_activity_blood },
			{ id: 'guidance', icon: stethoscopeIcon, label: m.project_medical_activity_guidance },
			{ id: 'awareness', icon: megaphoneIcon, label: m.project_medical_activity_awareness }
		],
		resources: [
			{
				id: 'ward',
				kind: 'book',
				title: m.project_medical_resource_ward_title,
				description: m.project_medical_resource_ward_description,
				shortDescription: m.project_medical_resource_ward_description_short,
				cover: medicalImage
			},
			{
				id: 'blood',
				kind: 'document',
				title: m.project_medical_resource_blood_title,
				description: m.project_medical_resource_blood_description,
				shortDescription: m.project_medical_resource_blood_description_short,
				cover: avisBolognaImage
			},
			{
				id: 'clown',
				kind: 'video',
				title: m.project_medical_resource_clown_title,
				description: m.project_medical_resource_clown_description,
				shortDescription: m.project_medical_resource_clown_description_short,
				cover: clownTherapyImage
			},
			{
				id: 'listening',
				kind: 'book',
				title: m.project_medical_resource_listening_title,
				description: m.project_medical_resource_listening_description,
				shortDescription: m.project_medical_resource_listening_description_short,
				cover: medicalImage
			}
		],
		partners: [
			{ name: 'VIS Foundation', initial: 'V' },
			{ name: 'AVIS Bologna', initial: 'A' },
			{ name: 'Clown Dottori', initial: 'C' }
		]
	},
	{
		id: 'international',
		name: m.projects_international_title,
		titleStart: m.project_international_title_start,
		titleHighlight: m.project_international_title_highlight,
		summary: m.project_international_summary,
		header: {
			src: internationalImage,
			alt: m.what_we_do_international_alt_hug,
			position: 'object-[50%_40%]'
		},
		intro: m.project_international_intro,
		paragraphs: [m.project_international_description, m.project_international_approach],
		gallery: [
			{
				src: internationalImage,
				alt: m.what_we_do_international_alt_hug,
				position: 'object-[50%_40%]'
			},
			{ src: rotterdamImage, alt: m.what_we_do_international_alt_students }
		],
		activities: [
			{ id: 'camps', icon: tentIcon, label: m.project_international_activity_camps },
			{ id: 'emergency', icon: sirenIcon, label: m.project_international_activity_emergency },
			{
				id: 'partnerships',
				icon: globeIcon,
				label: m.project_international_activity_partnerships
			},
			{ id: 'exchanges', icon: languagesIcon, label: m.project_international_activity_exchanges }
		],
		resources: [
			{
				id: 'departure',
				kind: 'book',
				title: m.project_international_resource_departure_title,
				description: m.project_international_resource_departure_description,
				shortDescription: m.project_international_resource_departure_description_short,
				cover: internationalImage
			},
			{
				id: 'emergency',
				kind: 'document',
				title: m.project_international_resource_emergency_title,
				description: m.project_international_resource_emergency_description,
				shortDescription: m.project_international_resource_emergency_description_short,
				cover: milanMealsImage
			},
			{
				id: 'stories',
				kind: 'video',
				title: m.project_international_resource_stories_title,
				description: m.project_international_resource_stories_description,
				shortDescription: m.project_international_resource_stories_description_short,
				cover: rotterdamImage
			},
			{
				id: 'delegation',
				kind: 'document',
				title: m.project_international_resource_delegation_title,
				description: m.project_international_resource_delegation_description,
				shortDescription: m.project_international_resource_delegation_description_short,
				cover: rotterdamImage
			}
		],
		partners: [
			{ name: 'VIS Foundation', initial: 'V' },
			{ name: 'Volunteers Madrid', initial: 'M' },
			{ name: 'Volunteers Rotterdam', initial: 'R' }
		]
	}
];

export function getProjectDetail(id: string) {
	return projectDetails.find((project) => project.id === id);
}

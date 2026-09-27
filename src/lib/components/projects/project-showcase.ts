import { m } from '$lib/paraglide/messages.js';
import type { ProjectId } from './projects';
import type { ProjectImage } from './project-details';
import citizensImage from '$lib/assets/projects/citizens.png';
import citizensCleanup from '$lib/assets/projects/citizens/gallery-cleanup.png';
import citizensWorkshop from '$lib/assets/projects/citizens/gallery-workshop.png';
import childrenImage from '$lib/assets/projects/children.jpg';
import youthRecordImage from '$lib/assets/news/youth-record.jpg';
import palermoWorkshopsImage from '$lib/assets/news/palermo-workshops.jpg';
import medicalImage from '$lib/assets/projects/medical.jpg';
import avisBolognaImage from '$lib/assets/news/avis-bologna.png';
import clownTherapyImage from '$lib/assets/news/clown-therapy.jpg';
import internationalImage from '$lib/assets/projects/international.jpg';
import rotterdamImage from '$lib/assets/news/rotterdam.jpg';

/**
 * Photos shown for each project on /what-we-do: the first is the lead shot,
 * the rest (one or two) sit beside it in the mosaic.
 */
export const projectPhotos: Record<ProjectId, ProjectImage[]> = {
	citizens: [
		{ src: citizensImage, alt: m.what_we_do_citizens_alt_food_drive },
		{
			src: citizensCleanup,
			alt: m.project_citizens_gallery_cleanup,
			position: 'object-[20%_center]'
		},
		{ src: citizensWorkshop, alt: m.project_citizens_gallery_workshop }
	],
	children: [
		{ src: childrenImage, alt: m.what_we_do_children_alt_play, position: 'object-[50%_30%]' },
		{ src: youthRecordImage, alt: m.what_we_do_children_alt_group },
		{ src: palermoWorkshopsImage, alt: m.what_we_do_children_alt_mural }
	],
	medical: [
		{ src: medicalImage, alt: m.what_we_do_medical_alt_ward, position: 'object-[50%_55%]' },
		{ src: clownTherapyImage, alt: m.what_we_do_medical_alt_clown },
		{ src: avisBolognaImage, alt: m.what_we_do_medical_alt_blood }
	],
	international: [
		{
			src: internationalImage,
			alt: m.what_we_do_international_alt_hug,
			position: 'object-[50%_40%]'
		},
		{ src: rotterdamImage, alt: m.what_we_do_international_alt_students }
	]
};

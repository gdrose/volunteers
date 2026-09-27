import type {
	HOME_PAGE_QUERY_RESULT,
	PROJECT_QUERY_RESULT,
	PROJECT_SHOWCASE_QUERY_RESULT
} from '$lib/sanity/sanity.types';

export type ProjectCardData = HOME_PAGE_QUERY_RESULT['projects'][number];
export type ProjectShowcaseData = PROJECT_SHOWCASE_QUERY_RESULT[number];
export type ProjectDetail = NonNullable<PROJECT_QUERY_RESULT>;
export type ProjectImage = NonNullable<ProjectShowcaseData['showcasePhotos']>[number];
export type ProjectActivity = NonNullable<ProjectDetail['activities']>[number];
export type ProjectResource = NonNullable<ProjectDetail['resources']>[number];
export type ResourceKind = ProjectResource['kind'];

const icons = import.meta.glob<string>('../../assets/icons/*.svg', {
	eager: true,
	import: 'default'
});

/** Activity icon names in Sanity match the SVG file names in `$lib/assets/icons`. */
export function activityIcon(name: ProjectActivity['icon']) {
	return icons[`../../assets/icons/${name}.svg`];
}

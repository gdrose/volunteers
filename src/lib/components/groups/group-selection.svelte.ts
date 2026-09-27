import { goto } from '$app/navigation';
import { resolve } from '$app/paths';
import { page } from '$app/state';
import type { Pathname, ResolvedPathname } from '$app/types';
import { localizeHref } from '$lib/paraglide/runtime';
import { findGroup, type LocalGroup } from './groups';

// The open group lives in the URL (`?group=milano`) so its details dialog can be linked to.

/** The group whose details dialog is open, if any. Reactive when read in a component. */
export const selectedGroup = () => findGroup(page.url.searchParams.get('group'));

/** Link that opens a group's details dialog. */
export const groupHref = (group: LocalGroup) => `?group=${group.id}`;

/** Opens a group's details dialog, or closes it when called without a group. */
export function showGroup(group?: LocalGroup) {
	const path = resolve(localizeHref('/find-a-group') as Pathname);
	const search = group ? groupHref(group) : '';
	goto(`${path}${search}` as ResolvedPathname, {
		noScroll: true,
		keepFocus: true,
		replaceState: true
	});
}

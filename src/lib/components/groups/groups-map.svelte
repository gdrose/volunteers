<script lang="ts">
	import { onMount } from 'svelte';
	import type { Map as LeafletMap, Marker } from 'leaflet';
	import 'leaflet/dist/leaflet.css';
	import 'leaflet.markercluster/dist/MarkerCluster.css';
	import legendLocal from '$lib/assets/groups/legend-local.svg';
	import legendProject from '$lib/assets/groups/legend-project.svg';
	import { m } from '$lib/paraglide/messages.js';
	import { cn } from '$lib/utils.js';
	import { groups, type GroupKind, type LocalGroup } from './groups';

	type Props = {
		/** Called when a group's marker is clicked (or activated with the keyboard). */
		onSelect: (group: LocalGroup) => void;
		class?: string;
	};

	let { onSelect, class: className }: Props = $props();

	// Leaflet's own stylesheet is unlayered, so its font/link rules beat Tailwind utilities;
	// the few classes that must win over it below are marked important (`!`).
	let container: HTMLDivElement;
	let map: LeafletMap | undefined;
	const markers: Record<string, Marker> = {};
	// Cluster layers per kind, so a group can be revealed from inside a cluster.
	let clusters: Record<GroupKind, import('leaflet').MarkerClusterGroup> | undefined;

	const kindColor: Record<GroupKind, string> = { local: 'bg-primary', project: 'bg-link' };

	/** Zooms to a group's marker, expanding its cluster if needed. */
	export function focusGroup(group: LocalGroup) {
		const marker = markers[group.id];
		if (!marker || !clusters) return;
		clusters[group.kind].zoomToShowLayer(marker, () => {});
	}

	onMount(() => {
		let cancelled = false;

		(async () => {
			const L = (await import('leaflet')).default;
			// The markercluster plugin extends the global `L`.
			(window as unknown as { L: typeof L }).L = L;
			await import('leaflet.markercluster');
			if (cancelled) return;

			map = L.map(container, { scrollWheelZoom: false, zoomControl: true });
			L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution:
					'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
				maxZoom: 19
			}).addTo(map);

			const makeCluster = (kind: GroupKind) =>
				L.markerClusterGroup({
					showCoverageOnHover: false,
					maxClusterRadius: 40,
					iconCreateFunction: (cluster) =>
						L.divIcon({
							className: '',
							html: `<span class="flex size-10 items-center justify-center rounded-full ${kindColor[kind]} text-small font-bold text-white shadow-[0_4px_4px_rgba(0,0,0,0.2)]">${cluster.getChildCount()}</span>`,
							iconSize: [40, 40]
						})
				});
			clusters = { local: makeCluster('local'), project: makeCluster('project') };

			for (const group of groups) {
				const marker = L.marker([group.lat, group.lng], {
					title: group.city,
					icon: L.divIcon({
						className: '',
						html: `<span class="block size-4 rounded-full border-2 border-white ${kindColor[group.kind]} shadow-[0_2px_4px_rgba(0,0,0,0.3)]"></span>`,
						iconSize: [16, 16]
					})
				}).on('click', () => onSelect(group));
				markers[group.id] = marker;
				clusters[group.kind].addLayer(marker);
			}

			clusters.local.addTo(map);
			clusters.project.addTo(map);
			map.fitBounds(L.latLngBounds(groups.map((g) => [g.lat, g.lng])), { padding: [32, 32] });
		})();

		return () => {
			cancelled = true;
			map?.remove();
		};
	});
</script>

<div class={cn('isolate overflow-hidden rounded-[20px] border lg:rounded-3xl', className)}>
	<div
		class="flex justify-center gap-3 border-b bg-muted p-3 lg:justify-start lg:gap-4 lg:px-6 lg:py-4"
	>
		<span class="flex items-center gap-1 text-caption text-foreground lg:gap-1.5">
			<img src={legendLocal} alt="" width="12" height="12" class="size-2 lg:size-3" />
			{m.find_group_legend_local()}
		</span>
		<span class="flex items-center gap-1 text-caption text-foreground lg:gap-1.5">
			<img src={legendProject} alt="" width="12" height="12" class="size-2 lg:size-3" />
			{m.find_group_legend_projects()}
		</span>
	</div>
	<div
		bind:this={container}
		role="region"
		aria-label={m.find_group_map_label()}
		class="h-70 w-full bg-muted font-sans! lg:h-125"
	></div>
</div>

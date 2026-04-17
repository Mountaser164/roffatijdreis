<script lang="ts">
	import { onMount } from 'svelte';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import maplibregl from 'maplibre-gl';
	import { WarpedMapLayer } from '@allmaps/maplibre';
	import { mapView } from './store.svelte';

	let { annotation, opacity = 100 }: { annotation: string; opacity?: number } = $props();

	let mapElement: HTMLDivElement;
	let map: any;
	let loaded: boolean = $state(false);
	let isSyncing = false; // ← voeg deze toe

	const warpedMapLayer = new WarpedMapLayer();

	let derivedOpacity = $derived(opacity / 100);

	$effect(() => {
		if (loaded && annotation) {
			warpedMapLayer.clear();
			warpedMapLayer.addGeoreferenceAnnotationByUrl(annotation);
		}
	});

	$effect(() => {
		if (loaded && derivedOpacity != null) {
			warpedMapLayer.setOpacity(derivedOpacity);
		}
	});

	onMount(() => {
		map = new maplibregl.Map({
			style: 'https://tiles.openfreemap.org/styles/liberty',
			container: mapElement,
			maxPitch: 0,
			center: mapView.center,
			zoom: mapView.zoom
		});

		map.addControl(new maplibregl.NavigationControl());

		map.on('move', () => {
			if (!isSyncing) {
				mapView.center = map.getCenter().toArray() as [number, number];
				mapView.zoom = map.getZoom();
			}
		});

		map.on('load', () => {
			map.addLayer(warpedMapLayer);
			loaded = true;
		});
	});

	$effect(() => {
		if (loaded) {
			const center = mapView.center;
			const zoom = mapView.zoom;
			const c = map.getCenter();
			if (c.lng !== center[0] || c.lat !== center[1] || map.getZoom() !== zoom) {
				isSyncing = true;
				map.jumpTo({ center, zoom });
				isSyncing = false;
			}
		}
	});
</script>

<div bind:this={mapElement} class="absolute inset-0 h-full w-full"></div>

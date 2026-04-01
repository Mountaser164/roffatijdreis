<script lang="ts">
	import { onMount } from 'svelte';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import maplibregl from 'maplibre-gl';
	import { WarpedMapLayer } from '@allmaps/maplibre';
	import { viewState } from './store.svelte';

	let mapElement: HTMLDivElement;
	let map: any;
	let previousOpacity: number | undefined;
	let loaded: boolean = $state(false);
	let opacity = $derived(viewState.opacity / 100);
	let annotationUrl = $derived(viewState.annotation);

	const warpedMapLayer = new WarpedMapLayer();

	$effect(() => {
		if (loaded && annotationUrl) {
			warpedMapLayer.clear();
			warpedMapLayer.addGeoreferenceAnnotationByUrl(annotationUrl);
		}
	});

	$effect(() => {
		if (loaded && opacity != null) {
			warpedMapLayer.setOpacity(opacity);
		}
	});



	onMount(async () => {
		// Initialiseer de kaart - centreer op Rotterdam
		map = new maplibregl.Map({
			style: 'https://tiles.openfreemap.org/styles/liberty',
			container: mapElement,
			maxPitch: 0,
			center: [4.4777, 51.9244],
			zoom: 12
		});

		map.addControl(new maplibregl.NavigationControl());

		map.on('load', async () => {
			map.addLayer(warpedMapLayer);
			loaded = true;
		});
	});

	function toggleMap(event: KeyboardEvent) {
		if (event.repeat) return;
		if (event.code === 'Space') {
			if (previousOpacity === undefined) {
				previousOpacity = viewState.opacity;
				viewState.opacity = 0;
			} else {
				viewState.opacity = previousOpacity;
				previousOpacity = undefined;
			}
		}
	}

	
</script>

<svelte:window on:keydown={toggleMap} on:keyup={toggleMap} />

<div bind:this={mapElement} class="absolute inset-0 h-full w-full"></div>

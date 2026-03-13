<script lang="ts">
	import { onMount } from 'svelte';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import maplibregl from 'maplibre-gl';
	import { WarpedMapLayer } from '@allmaps/maplibre';

	let mapElement: HTMLDivElement;
	let map: any;
	let isHistoricalVisible: boolean = true;

	const annotationUrl = 'https://annotations.allmaps.org/maps/f216cd0b2a7c8a27';

	const warpedMapLayer = new WarpedMapLayer();

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
			warpedMapLayer.addGeoreferenceAnnotationByUrl(annotationUrl);
		});
	});

	function toggleMap(event: KeyboardEvent) {
		if (event.repeat) return;
		if (event.code === 'Space') {
			if (isHistoricalVisible) {
				warpedMapLayer.setOpacity(0);
				isHistoricalVisible = false;
			} else {
				warpedMapLayer.setOpacity(1);
				isHistoricalVisible = true;
			}
		}
	}
</script>

<svelte:window on:keydown={toggleMap} on:keyup={toggleMap} />

<div bind:this={mapElement} class="absolute h-screen w-screen"></div>

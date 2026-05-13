<script lang="ts">
	import { onMount } from 'svelte';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import maplibregl from 'maplibre-gl';
	import { WarpedMapLayer } from '@allmaps/maplibre';
	import { viewState, flyTo, selectedLocation, mapView } from './store.svelte';
	import { replaceState } from '$app/navigation';

	// Optionele props — als ze meegegeven worden, is het vergelijkingsmodus
	let {
		annotation = undefined,
		opacity = undefined
	}: {
		annotation?: string;
		opacity?: number;
	} = $props();

	// Vergelijkingsmodus als annotation prop meegegeven is
	let isVergelijken = $derived(annotation !== undefined);

	// Gebruik props in vergelijkingsmodus, anders de store
	let actieveAnnotation = $derived(isVergelijken ? annotation : viewState.annotation);
	let actieveOpacity = $derived((isVergelijken ? (opacity ?? 100) : viewState.opacity) / 100);

	let mapElement: HTMLDivElement;
	let map: any;
	let loaded: boolean = $state(false);
	let isSyncing = false;

	const warpedMapLayer = new WarpedMapLayer();

	// Laad de kaartlaag als de annotatie verandert
	$effect(() => {
		if (loaded && actieveAnnotation) {
			warpedMapLayer.clear();
			warpedMapLayer.addGeoreferenceAnnotationByUrl(actieveAnnotation);
		}
	});

	// Pas transparantie aan
	$effect(() => {
		if (loaded) {
			warpedMapLayer.setOpacity(actieveOpacity);
		}
	});

	// Vlieg naar locatie (alleen normale modus)
	$effect(() => {
		if (!isVergelijken && loaded && flyTo.center) {
			map.flyTo({ center: flyTo.center, zoom: 14 });
		}
	});

	// Tijdelijke marker (alleen normale modus)
	$effect(() => {
		if (!isVergelijken && loaded && selectedLocation.center) {
			const marker = new maplibregl.Marker().setLngLat(selectedLocation.center).addTo(map);
			setTimeout(() => {
				marker.remove();
				selectedLocation.center = null;
			}, 3000);
		}
	});

	// Synchroniseer kaarten in vergelijkingsmodus
	$effect(() => {
		if (isVergelijken && loaded) {
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

		map.on('moveend', () => {
			const center = map.getCenter();
			console.log('Kaart gestopt op:', center.lng, center.lat, 'zoom:', map.getZoom());

			// URL bijwerken (alleen normale modus)
			if (!isVergelijken) {
				const params = new URLSearchParams({
					lat: center.lat.toFixed(5),
					lng: center.lng.toFixed(5),
					zoom: map.getZoom().toFixed(2),
					year: String(viewState.annotation)
				});
				replaceState('?' + params.toString(), {});
			}
		});

		map.on('load', () => {
			map.addLayer(warpedMapLayer);
			loaded = true;
		});
	});

	// Toetsenbord toggle (alleen normale modus)
	let previousOpacity: number | undefined;
	function toggleMap(event: KeyboardEvent) {
		if (isVergelijken || event.repeat) return;
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

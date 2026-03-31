<!-- <script lang="ts">
    import { onMount } from 'svelte';
    import 'maplibre-gl/dist/maplibre-gl.css';
    import maplibregl from 'maplibre-gl';
    import { WarpedMapLayer } from '@allmaps/maplibre';

    let { annotation }: { annotation: string } = $props();

    let mapElement: HTMLDivElement;
    let map: any;
    let loaded: boolean = $state(false);
    const warpedMapLayer = new WarpedMapLayer();

    $effect(() => {
        if (loaded && annotation) {
            warpedMapLayer.clear();
            warpedMapLayer.addGeoreferenceAnnotationByUrl(annotation);
        }
    });

    onMount(() => {
        map = new maplibregl.Map({
            style: 'https://tiles.openfreemap.org/styles/liberty',
            container: mapElement,
            maxPitch: 0,
            center: [4.4777, 51.9244],
            zoom: 12
        });

        map.addControl(new maplibregl.NavigationControl());

        map.on('load', () => {
            map.addLayer(warpedMapLayer);
            loaded = true;
        });
    });
</script>

<div bind:this={mapElement} class="absolute inset-0 h-full w-full"></div> -->

export let viewState = $state({
    opacity: 100,
    annotation: undefined as string | undefined
});



export let comparison = $state({
    active: false,
    leftAnnotation: '',
    rightAnnotation: '',
    leftOpacity: 100,
    rightOpacity: 100
});

export let flyTo = $state({
    center: null as [number, number] | null
});

export let selectedLocation = $state({
    center: null as [number, number] | null
});

export let mapView = $state({
    center: [4.4777, 51.9244] as [number, number],
    zoom: 12
});

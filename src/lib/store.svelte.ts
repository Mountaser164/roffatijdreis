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

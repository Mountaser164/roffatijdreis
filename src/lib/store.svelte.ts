export let viewState = $state({
    opacity: 100,
    annotation: undefined as string | undefined
});

export let comparison = $state({
    active: false,
    leftAnnotation: '',
    rightAnnotation: ''
});

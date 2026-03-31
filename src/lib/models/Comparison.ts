export class Comparison {
    active: boolean = $state(false);
    leftAnnotation: string = $state('');
    rightAnnotation: string = $state('');

    enable(): void {
        this.active = true;
    }

    disable(): void {
        this.active = false;
    }

    setLeft(annotation: string): void {
        this.leftAnnotation = annotation;
    }

    setRight(annotation: string): void {
        this.rightAnnotation = annotation;
    }
}

export const comparison = new Comparison();

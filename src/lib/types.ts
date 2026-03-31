
export type MapMetadata = {
    label: string
    title: string
    year: number
    url: string
    institution: string
    annotation: string
    iiif?: {
        url: string
        type: string
    }
}
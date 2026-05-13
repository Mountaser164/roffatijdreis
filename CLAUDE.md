# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start development server
npm run build      # Production build
npm run preview    # Preview production build
npm run check      # Type-check with svelte-check
npm run format     # Format code with Prettier
npm run lint       # Check formatting
```

## Architecture

**Roffa reis door de tijd** is a SvelteKit app that overlays historical maps of Rotterdam on a modern MapLibre base map using Allmaps georeferencing.

### Key technologies
- **SvelteKit** with Svelte 5 (uses `$state`, `$derived`, `$effect`, `$props` runes — not stores)
- **MapLibre GL** for the base map
- **@allmaps/maplibre** — `WarpedMapLayer` renders georeferenced historical maps via annotation URLs
- **Tailwind CSS v4**

### State management (`src/lib/store.svelte.ts`)
All shared state lives here as Svelte 5 `$state` objects:
- `viewState` — opacity and active annotation for the single map view
- `comparison` — vergelijken-modus state (active, left/right annotation + opacity)
- `flyTo` — triggers map.flyTo() when center is set
- `selectedLocation` — drops a temporary marker, clears after 3s
- `mapView` — persists the current map center/zoom so vergelijken-modus starts at the same position

### Map components
- `Map.svelte` — single map view, reads from `viewState`, saves position to `mapView` on `moveend`
- `MapView.svelte` — used in vergelijken-modus (two instances side by side), takes `annotation` and `opacity` as props, syncs pan/zoom via `mapView` using an `isSyncing` flag to prevent infinite loops

### Data flow
- `src/lib/content/data.ts` — array of `MapMetadata` (label, title, year, institution, url, annotation URL, optional iiif)
- `KaartCollectie` instantiates `KaartItem` objects from data
- `Nav.svelte` renders the kaartcollectie list, transparantie slider, kaartinfo panel, and download button
- In vergelijken-modus, `Nav` receives `onSelect`, `opacity`, and `onOpacityChange` props to control left/right independently

### Geocoder
`Zoekservice.svelte.ts` uses Nominatim (OpenStreetMap) bounded to Rotterdam (`viewbox=4.3,52.0,4.6,51.85`). Uses debounce (300ms) via `zoekMetVertraging()`. Results are shown as a dropdown in the navbar.

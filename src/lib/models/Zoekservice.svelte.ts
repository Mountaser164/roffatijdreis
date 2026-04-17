export class Zoekservice {
	resultaten: any[] = $state([]);
	zoekterm: string = $state('');
	private debounceTimer: ReturnType<typeof setTimeout> | null = null;

	async zoek() {
		if (!this.zoekterm) {
			this.resultaten = [];
			return;
		}
		const res = await fetch(
			`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(this.zoekterm)}&format=json&limit=5&viewbox=4.3,52.0,4.6,51.85&bounded=1&countrycodes=nl`
		);
		const data = await res.json();
		this.resultaten = data.filter((r: any) => r.display_name.toLowerCase().includes('rotterdam'));
	}

	zoekMetVertraging() {
		if (this.debounceTimer) clearTimeout(this.debounceTimer);
		this.debounceTimer = setTimeout(() => this.zoek(), 300);
	}

	kiesLocatie(resultaat: any): [number, number] {
		this.zoekterm = resultaat.display_name.split(',')[0];
		this.resultaten = [];
		return [parseFloat(resultaat.lon), parseFloat(resultaat.lat)];
	}
}

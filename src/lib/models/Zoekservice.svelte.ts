export class Zoekservice {
    resultaten: any[] = $state([]);
    zoekterm: string = $state('');

    async zoek() {
        if (!this.zoekterm) return;
        const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(this.zoekterm)}&format=json&limit=5`);
        this.resultaten = await res.json();
    }

    kiesLocatie(resultaat: any): [number, number] {
        this.zoekterm = resultaat.display_name.split(',')[0];
        this.resultaten = [];
        return [parseFloat(resultaat.lon), parseFloat(resultaat.lat)];
    }
}

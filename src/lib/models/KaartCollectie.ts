import { KaartItem } from './KaartItem';

import data from '../content/data';

export class KaartCollectie {
	private kaarten: KaartItem[];

	constructor() {
		this.kaarten = data.map((item, index) => {
			const active = index === 0 ? true : false;
			return new KaartItem(item, active);
		});
	}

	// Geef alle kaarten terug
	getAlleKaarten(): KaartItem[] {
		return this.kaarten;
	}

	// Activeer een kaart op basis van jaar
	activeer(year: number): void {
		this.kaarten.forEach((k) => (k.active = k.metadata.year === year));
	}
}

<script lang="ts">
	import { KaartCollectie } from '$lib/models/KaartCollectie';
	import { viewState } from './store.svelte';
	import { base } from '$app/paths';

	

    const collectie = new KaartCollectie();
    let kaarten = collectie.getAlleKaarten();
    viewState.annotation = kaarten[0]?.metadata.annotation;


	function setMap(map) {
		viewState.annotation = map.metadata.annotation;
	}

	function selecteer(jaar: number) {
		collectie.activeer(jaar);
		kaarten = collectie.getAlleKaarten();
	}
</script>

<aside
	class="w-68 flex-none overflow-y-auto bg-gray-50 p-4"
	style="font-family: 'Barlow Condensed', sans-serif;"
>
	<h2 class="mb-8 text-lg font-bold">Kaartcollectie</h2>
	<ul class="flex flex-col divide-y divide-gray-200">
		{#each kaarten as kaart}
			<li>
				<button
					onclick={() => setMap(kaart)}
					class="flex w-full items-center gap-3 px-3 py-2 {kaart.active
						? 'bg-gray-800 text-white'
						: 'hover:bg-gray-200'}"
				>
					<span class="text-xs font-bold {kaart.getJaarKleur()}">{kaart.metadata.year}</span>
					<span>{kaart.metadata.label}</span>
				</button>
			</li>
		{/each}
	</ul>

	<div class="mt-6 border-t border-gray-200 pt-4">
		<p class="mb-3 text-xs font-bold tracking-widest text-gray-500 uppercase">
			Transparantie historische laag
		</p>
		<input
			bind:value={viewState.opacity}
			type="range"
			id="opacity"
			name="opacity"
			min="0"
			max="100"
			class="w-full accent-green-700"
		/>
		<div class="mt-1 flex justify-between text-xs text-gray-400">
			<span>0%</span>
			<span class="font-bold text-gray-700">{viewState.opacity}%</span>
			<span>100%</span>
		</div>
	</div>
</aside>

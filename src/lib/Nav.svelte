<script lang="ts">
	import { viewState } from './store.svelte';
</script>

<!-- Sidebar rechts -->
<aside class="w-68 flex-none overflow-y-auto bg-gray-50 p-4" style="font-family: 'Barlow Condensed', sans-serif;">
	<h2 class="mb-8 text-lg font-bold">Kaartcollectie</h2>
	<ul class="flex flex-col divide-y divide-gray-200">
    <li>
    <a href="/" class="flex items-center gap-3 bg-gray-800 px-3 py-2 text-white hover:bg-gray-700">
        <span class="text-xs font-bold text-orange-400">1850</span>
        <span class="font-semibold">Kadasterkaart</span>
    </a>
</li>
<li>
    <a href="/" class="flex items-center gap-3 px-3 py-2 hover:bg-gray-200">
        <span class="text-xs font-bold text-orange-400">1890</span>
        <span>Stadsuitbreiding</span>
    </a>
</li>
<li>
    <a href="/" class="flex items-center gap-3 px-3 py-2 hover:bg-gray-200">
        <span class="text-xs font-bold text-orange-400">1920</span>
        <span>Topografische kaart</span>
    </a>
</li>
<li>
    <a href="/" class="flex items-center gap-3 px-3 py-2 hover:bg-gray-200">
        <span class="text-xs font-bold text-orange-400">1940</span>
        <span>Vóór bombardement</span>
    </a>
</li>
<li>
    <a href="/" class="flex items-center gap-3 px-3 py-2 hover:bg-gray-200">
        <span class="text-xs font-bold text-blue-500">1960</span>
        <span>Wederopbouw</span>
    </a>
</li>
<li>
    <a href="/" class="flex items-center gap-3 px-3 py-2 hover:bg-gray-200">
        <span class="text-xs font-bold text-blue-500">1980</span>
        <span>Moderne atlas</span>
    </a>
</li>
</ul>


	<div class="mt-6 border-t border-gray-200 pt-4">
    <p class="mb-3 text-xs font-bold uppercase tracking-widest text-gray-500">Transparantie historische laag</p>
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

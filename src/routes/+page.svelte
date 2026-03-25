<script>
	import Map from '$lib/Map.svelte';
	import Nav from '$lib/Nav.svelte';
    import { base } from '$app/paths';
</script>

<div class="flex h-screen flex-col">
	

<nav class="flex flex-none items-center justify-between bg-green-700 px-4 py-2 text-white" style="font-family: 'Barlow Condensed', sans-serif;">
		<div class="flex items-center gap-3">
			<div class="flex items-center space-x-35">
				<div class="flex items-center rounded bg-white px-2 py-1">
    <input
        type="text"
        placeholder="Zoek locatie..."
        class="w-48 bg-transparent text-gray-800 text-sm outline-none"
    />
    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
    </svg>
</div>



<button class="flex items-center justify-center gap-2 rounded border border-gray-400 px-2 py-1 text-sm font-semibold text-white hover:bg-gray-600 w-50 h-[50px]">
    Vergelijken
    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 10h4M15 3h4a2 2 0 0 0 2 2v14a2 2 0 0 0-2 2h-4M12 3v18" />
    </svg>
</button>


                 <h1 class="text-2xl font-bold" style="font-family: 'Barlow Condensed', sans-serif;">Roffa reis door de tijd</h1>
				<a href="{base}/tijdlijn">Over</a>
                <a href="{base}/tijdlijn">Delen</a>
			</div>
		</div>
	</nav>
	



	<!-- Kaart + Sidebar -->
<div class="flex flex-1 flex-row overflow-hidden">
    <Nav></Nav>
    <!-- Kaart rechts -->
    <div class="relative flex-1 grow">
        <Map />
    </div>
</div>

</div>
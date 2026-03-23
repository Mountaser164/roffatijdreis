<script>
	import Map from '$lib/Map.svelte';
	import Nav from '$lib/Nav.svelte';
</script>

<div class="flex h-screen flex-col">
	<header class="flex-none shrink-0 bg-gray-800 p-4 text-white">
		<h1 class="text-2xl font-bold">Roffa reis door de tijd</h1>
	</header>

	<nav class="flex flex-none items-center justify-between bg-gray-700 px-4 py-2 text-white">
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

				<a href="/" class="hover:text-yellow-400">Kaart</a>
				<a href="/over" class="hover:text-yellow-400">Collecties</a>
				<a href="/tijdlijn" class="hover:text-yellow-400">Over</a>
				<a href="/tijdlijn" class="hover:text-yellow-400">Help</a>
			</div>
		</div>
	</nav>
	

	<!-- Kaart + Sidebar -->
	<div class="flex flex-1 flex-row overflow-hidden">
		<!-- Kaart links -->
		<div class="relative flex-1 grow">
			<Map />
		</div>
		<Nav></Nav>
	</div>
</div>

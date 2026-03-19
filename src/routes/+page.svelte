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
				<a href="/" class="hover:text-yellow-400">
					<img
						src="https://cdn.vectorstock.com/i/1000v/71/04/rotterdam-logo-vector-50887104.jpg"
						alt="Roffa logo"
						class="h-8 w-auto object-contain"
						loading="lazy"
					/>
				</a>
				<a href="/" class="hover:text-yellow-400">Kaart</a>
				<a href="/over" class="hover:text-yellow-400">Collecties</a>
				<a href="/tijdlijn" class="hover:text-yellow-400">Over</a>
				<a href="/tijdlijn" class="hover:text-yellow-400">Help</a>
			</div>
		</div>
	</nav>
	<br>

	<!-- Kaart + Sidebar -->
	<div class="flex flex-1 flex-row overflow-hidden">
		<!-- Kaart links -->
		<div class="relative flex-1 grow">
			<Map />
		</div>
		<Nav></Nav>
	</div>
</div>

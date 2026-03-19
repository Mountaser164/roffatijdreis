<script lang="ts">
	import { viewState } from './store.svelte';

	const initialOpacity = viewState.opacity;

	function updateViewState(e: Event) {
		const element = e.currentTarget as HTMLInputElement;
		viewState.opacity = parseInt(element.value);
	}
</script>

<!-- Sidebar rechts -->
<aside class="w-68 flex-none overflow-y-auto bg-blue-50 p-4">
	<h2 class="mb-8 text-lg font-bold">Contents</h2>
	<ul class="flex flex-col gap-6">
		<li><a href="#dates" class="hover:text-purple-600">Dates</a></li>
		<li>
			<a href="#location" class="border-l-2 border-purple-600 pl-2 text-purple-600">Location</a>
		</li>
		<li><a href="#organisers" class="hover:text-purple-600">Organisers</a></li>
		<li><a href="#partners" class="hover:text-purple-600">Partners</a></li>
		<li><a href="#costs" class="hover:text-purple-600">Costs</a></li>
		<li><a href="#participants" class="hover:text-purple-600">Participants</a></li>
	</ul>

	<br /><br />

	<p>Audio settings:</p>

	<div>
		<input
			on:input={updateViewState}
			value={initialOpacity}
			type="range"
			id="opacity"
			name="opacity"
			min="0"
			max="100"
		/>
		<label for="opacity">Opacity</label>
	</div>

	<div>
		<input type="range" id="cowbell" name="cowbell" min="0" max="100" value="90" step="10" />
		<label for="cowbell">Cowbell</label>
	</div>
</aside>

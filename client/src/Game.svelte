<script lang='ts'>
	// UI
	import Box from '$lib/Box.svelte';
	import { onMount } from 'svelte';

	// Internal game stuff
	import { GRID_SIZE } from "$lib/entity/Entity"
	import { TILE_WIDTH } from '$lib/Camera';
	import { World } from '$lib/entity/World';

	// import { Slime } from '$lib/enemies/Slime';
	// import { Player } from '$lib/map/Player';

	// PIXI
	import { Application } from 'pixi.js';

	let parent: HTMLElement;
	let app: Application;

	let world: World

	onMount(async () => {
		// Init PIXI window
		app = new Application({
			width: TILE_WIDTH * GRID_SIZE,
			height: TILE_WIDTH * GRID_SIZE
		});
		parent.appendChild(app.view);
		app.renderer.backgroundColor = 0xFFFFFF;


		world = new World(app)
	});
</script>

<Box>
	<div bind:this={parent}></div>
</Box>
<script lang='ts'>
	// UI
	import Box from '$lib/Box.svelte';
	import { onMount } from 'svelte';

	// Internal game stuff
	import { Entity, GRID_SIZE } from '$lib/map/Entity';
	import { Player } from '$lib/map/Player';
	import { Backgroud } from '$lib/map/Background';
	import { TILE_WIDTH } from '$lib/Camera';
	import { World } from '$lib/map/World';


	// PIXI
	import { Application, Sprite } from 'pixi.js';

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

		// Create background
		const bkg = new Backgroud(app, TILE_WIDTH * GRID_SIZE * 2); // 2x2 meta grid
		world.add(bkg)

		// Create player
		const {username} = await fetch("/api/auth/username").then(res => res.json())
		const player = new Player(app, true, username)
		world.add(player)

		// Load other players
		let otherPlayers = await fetch("/api/game/players").then(res => res.json())
		for (const username of otherPlayers) {
			world.add(new Player(app, false, username))
		}
	});
</script>

<Box>
	<div bind:this={parent}></div>
</Box>
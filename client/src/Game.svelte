<script lang='ts'>
	// UI
	import Box from '$lib/Box.svelte';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	// Other
	import Cookies from 'js-cookie';

	// Internal game stuff
	import { Key } from "$lib/input/Key"
	import { GRID_SIZE, GridTile, GridTileType, grid } from '$lib/map/Grid';

	// PIXI
	import { Application, Sprite } from 'pixi.js';
	import { PlayerTile } from '$lib/map/PlayerTile';


	let parent: HTMLElement;
	let app: Application;

	onMount(async () => {
		// Init PIXI window
		app = new Application({
			width: 64 * GRID_SIZE,
			height: 64 * GRID_SIZE
		});
		parent.appendChild(app.view);
		app.renderer.backgroundColor = 0xFFFFFF;

		// Create player
		const {username} = await fetch("/api/auth/username").then(res => res.json())
		const player = new PlayerTile(app, true, username)

		// Load other players
		let otherPlayers = await fetch("/api/game/players").then(res => res.json())
		for (const username of otherPlayers) {
			grid.push(new PlayerTile(app, false, username))
		}

		app.ticker.add((delta) => {
			grid.forEach((tile) => {
				tile.update()
				
				tile.sprite.x = 64 * tile.pos.x
				tile.sprite.y = 64 * tile.pos.y
			})
		})
	});
</script>

<Box>
	<div bind:this={parent}></div>
</Box>
<script lang='ts'>
	// UI
	import Box from '$lib/Box.svelte';
	import { onMount } from 'svelte';

	// Internal game stuff
	import { Key } from "$lib/Key"

	// PIXI
	import { Application, Sprite } from 'pixi.js';
import { writable } from 'svelte/store';

	enum GridTile {
		Nothing = 0,
		Player = 1
	}

	const GRID_SIZE = 10;
	const MOVEMENT_LOCK_TIME = 250;

	let parent: HTMLElement;
	let app: Application;

	const playerSprite = Sprite.from('/favicon.png');

	let grid = Array.apply(null, Array(GRID_SIZE)).map(() => Array.apply(GridTile.Nothing, Array(GRID_SIZE))); // 2D array of GRID_SIZE

	let w: Key, a: Key, s: Key, d: Key;

	onMount(() => {
		// Init PIXI window
		app = new Application({
			width: 64 * GRID_SIZE,
			height: 64 * GRID_SIZE
		});
		parent.appendChild(app.view);
		app.renderer.backgroundColor = 0xFFFFFF;

		// Setup player position
		const playerPos =  writable<{x: number, y: number}>({x: 0, y: 0})
		playerPos.subscribe(pos => {
			playerSprite.x = 64 * pos.x
			playerSprite.y = 64 * pos.y
		})
		playerPos.set({
			x: Math.floor(Math.random() * GRID_SIZE),
			y: Math.floor(Math.random() * GRID_SIZE)
		})
		app.stage.addChild(playerSprite);

		w = new Key("w")
		a = new Key("a")
		s = new Key("s")
		d = new Key("d")

		let movementLock = false;
		const move = (d: {x?: number, y?: number}) => {
			if (!movementLock) {
				movementLock = true
				setTimeout(() => {movementLock = false}, MOVEMENT_LOCK_TIME)
				let frames = writable(0)
				const updateID = setInterval(() => {
					playerPos.update(pos => {
						if (d.x) pos.x += d.x / 8 // Move player by eighth of total movement (change in x / interval(8))
						if (d.y) pos.y += d.y / 8

						return pos
					})
					frames.update(f => f + 1) // Used for animation frames and to stop the interval after 8 passes
				}, MOVEMENT_LOCK_TIME / 8)
				frames.subscribe(f => {
					// TODO: Animations
					if (f === 8) clearInterval(updateID)
				})
			}
		};

		app.ticker.add((delta: number) => {
			if (w.isDown) move({y: -1})
			if (a.isDown) move({x: -1})
			if (s.isDown) move({y: 1})
			if (d.isDown) move({x: 1})
		});
	});
</script>

<Box>
	<div bind:this={parent}></div>
</Box>
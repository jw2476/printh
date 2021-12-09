<script lang='ts'>
	// UI
	import Box from '$lib/Box.svelte';
	import { onMount } from 'svelte';
	import CombatUI from './CombatUI.svelte';

	// Internal game stuff
	import { GRID_SIZE } from "$lib/entity/Entity"
	import { TILE_WIDTH } from '$lib/Camera';
	import { World } from '$lib/entity/World';

	// PIXI
	import { Application } from 'pixi.js';
	import { sound } from "@pixi/sound"
	import { socket } from '$lib/stores';
	import { PacketOpcode } from '$lib/Packet';
	import { playMusic, PlayMusicPacketData } from '$lib/Music';
	import { writable } from 'svelte/store';

	let parent: HTMLElement;
	let app: Application;

	let inCombat = false

	let world: World

	onMount(async () => {
		// Init PIXI window
		app = new Application({
			width: TILE_WIDTH * GRID_SIZE,
			height: TILE_WIDTH * GRID_SIZE
		});
		parent.appendChild(app.view);
		app.renderer.backgroundColor = 0xFFFFFF;

		world = new World(app, 1)

		socket.on(PacketOpcode.INITIATE_COMBAT, () => {
			playMusic("rude_buster.mp3", true)
			inCombat = true
		})
	});
</script>

<Box>
	<div class="grid grid-cols-2">
		<div bind:this={parent}></div>
		{#if inCombat}
			<CombatUI />
		{/if}
	</div>
</Box>


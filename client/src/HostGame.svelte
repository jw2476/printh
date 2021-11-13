<script lang='ts'>
	import Box from './lib/Box.svelte';
	import { onMount } from 'svelte';
	import { socket } from './lib/stores.js';
	import Button from './lib/Button.svelte';

	let code = 'Loading...';
	let players: Array<Object> = [];


	onMount(async () => {
		const res = await fetch('/api/createGame').then(res => res.json());
		code = res.code;

		$socket.on('updatePlayers', plrs => {
			players = plrs;
		});
	});

	async function startGame() {
		$socket.emit("startGame")
	}
</script>

<Box>
	<p class='text text-indigo-200 text-xl'>Enter the code below to join the game</p>
	<p class='text text-white text-7xl font-bold'>Code: {code}</p>
	<Button onClick={startGame}>Start Game</Button>
</Box>
<Box>
	<div class='grid grid-cols-5 gap-4'>
		{#each players as player}
			<div class='text text-white border border-gray-900 rounded-md p-4 shadow-lg'>{player.username}</div>
		{/each}
	</div>
</Box>

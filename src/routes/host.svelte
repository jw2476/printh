<script lang='ts'>
	import Box from '../lib/components/Box.svelte';
	import { onMount } from 'svelte';
	import { socket, token } from '../lib/stores';

	let code = 'Loading...';
	let playerNames: Array<string> = []

	onMount(async () => {
		code = await fetch("/api/host/generateCode", {
			headers: {
				"Authorization": $token
			}
		}).then(res => res.json())

		$socket?.on("playerJoined", (username: string) => {
			playerNames = [...playerNames, username]
			console.log("Player name added")
		})

		$socket?.on("playerLeft", (username: string) => {
			const idx = playerNames.indexOf(username)
			playerNames.splice(idx, 1)
			playerNames = playerNames // Update
			console.log(playerNames)
		})
	})
</script>
<Box>
	<p class='text-indigo-200 text-center text-lg'>Enter the code below to join</p>
	<p class='text-white text-center text-7xl'>Code: {code}</p>
	<div class='relative'>
		<button class='absolute bottom-0 right-0 rounded-br-xl rounded-tl-xl bg-gray-900 text-white font-bold text-xl -m-8 p-4 border-t-4 border-l-4 border-indigo-900'>Start game</button>
	</div>
</Box>
<Box>
	<div class='grid grid-cols-5 gap-4'>
		{#each playerNames as name}
			<div class='bg-indigo-500 rounded-xl px-16 py-4'>
				<p class='text-white text-center'>{name}</p>
			</div>
		{/each}
	</div>
</Box>

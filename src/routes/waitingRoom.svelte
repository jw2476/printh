<script>
	import Box from '../lib/components/Box.svelte';
	import { socket } from '../lib/stores';
	import { goto } from '$app/navigation';

	$socket?.on("startGame", () => {
		goto("/game")
	})
</script>

<Box>
	<p class='text-white text-3xl text-center'>Joined game! See if you can find your name on the board</p>
</Box>
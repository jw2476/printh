<script>
	import Box from './lib/Box.svelte';
	import { onMount } from 'svelte';

	let code = 'Loading...';

	onMount(async () => {
		const res = await fetch('/api/createGame').then(res => res.json());
		code = res.code;
	});
</script>

<Box>
	<p class='text text-indigo-200 text-xl'>Enter the code below to join the game</p>
	<p class='text text-white text-7xl font-bold'>Code: {code}</p>
</Box>

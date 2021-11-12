<script lang='ts'>
	import Box from './lib/Box.svelte';
	import Input from './lib/Input.svelte';
	import Button from './lib/Button.svelte';
	import { socket } from './lib/stores.js';
	import { Message } from './common/Message.js';

	let code = '';
	let nan = false;

	async function joinGame() {
		nan = false

		const codeVal = parseInt(code)
		if (isNaN(codeVal)) {
			nan = true
			return
		}

		$socket.emit("joinGame", {
			code: codeVal
		})
	}
</script>

<div class='max-w-md mx-auto'>
	<Box>
		<p class='text text-white text-3xl'>Join Game</p>
		<p class='text text-white'>Code</p>
		{#if nan}
			<p class='text text-red-600'>Please enter a number</p>
		{/if}
		<Input bind:value={code} placeholder='123456' />
		<Button onClick={joinGame}>Submit</Button>
	</Box>
</div>
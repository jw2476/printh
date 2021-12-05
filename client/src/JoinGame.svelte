<script lang='ts'>
	import Box from './lib/Box.svelte';
	import Input from './lib/Input.svelte';
	import Button from './lib/Button.svelte';
	import { route, socket } from './lib/stores.js';
	import { onMount } from 'svelte';

	let code = '';
	let nan = false;
	let state: 'enterCode' | 'waiting' = 'enterCode';

	async function joinGame() {
		nan = false;

		const codeVal = parseInt(code);
		if (isNaN(codeVal)) {
			nan = true;
			return;
		}

		socket.emit('joinGame', {
			code: codeVal
		});
		state = 'waiting'
	}

	onMount(() => {
		socket.on('startGame', data => {
			
			route.set('game')
		})
	})
</script>

{#if state === "enterCode"}
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
{:else if state === "waiting"}
	<div class='max-w-md mx-auto'>
		<Box>
			<p class='text text-white text-3xl'>You're in!</p>
			<p class='text text-white'> Do you see your name on the host's screen?</p>
		</Box>
	</div>
{/if}
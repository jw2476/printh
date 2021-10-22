<script>
	import Box from '../lib/components/Box.svelte';
	import Input from '../lib/components/Input.svelte';
	import Button from '../lib/components/Button.svelte';
	import { token } from '../lib/stores';
	import { goto } from '$app/navigation';

	let code = '';
	let invalidCode = false;

	async function joinGame() {
		invalidCode = false

		const res = await fetch(`/api/joinGame?code=${code}`, {
			headers: {
				"Authorization": $token
			}
		})

		switch (res.status) {
			case 200: {
				goto("/waitingRoom")
				break;
			}
			case 404: {
				invalidCode = true
			}
		}
	}
</script>
<div class='max-w-md mx-auto'>
	<Box>
		<p class='text-white font-bold'>Code</p>
		{#if invalidCode}
			<p class='text-yellow-400 font-bold'>This code is invalid, please enter a valid one</p>
		{/if}
		<Input placeholder='123456' bind:value={code} />
		<Button handle={joinGame}>Submit</Button>
	</Box>
</div>
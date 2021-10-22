<script>
	import Box from '../lib/components/Box.svelte';
	import Input from '../lib/components/Input.svelte';
	import Button from '../lib/components/Button.svelte';
	import { goto } from '$app/navigation';
	import md5 from "md5"
	import { browser } from '$app/env';

	let username, password = '';
	let genericError, incorrect = false;
	let valueMissing = false;

	async function login() {
		genericError = false;
		incorrect = false;
		valueMissing = false;

		if (!username || !password) {
			valueMissing = true;
			return;
		}

		const res = await fetch('/api/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username,
				password: md5(password)
			})
		});
		switch (res.status) {
			case 200: {
				const {token} = await res.json()
				if (browser) // Will always be true
					localStorage.setItem("token", token)
				localStorage.setItem("loginSuccess", JSON.stringify(true))

				goto("/")
				break;
			}
			case 404: {
				incorrect = true;
				break;
			}
			default: {
				genericError = true;
			}
		}

	}
</script>

<div class='max-w-md mx-auto'>
	<Box>
		<p class='text-white font-bold'>Username</p>
		{#if !username && valueMissing}
			<p class='text-yellow-400 font-bold'>This field is required</p>
		{/if}
		<Input placeholder='Bob' bind:value={username} />

		<p class='text-white font-bold'>Password</p>
		{#if !password && valueMissing}
			<p class='text-yellow-400 font-bold'>This field is required</p>
		{/if}
		<Input placeholder='********' bind:value={password} />

		<Button handle={login}>Submit</Button>
		{#if genericError}
			<p class='text-yellow-400 font-bold'>An error occurred, if it persists please contact an admin</p>
		{:else if incorrect}
			<p class='text-yellow-400 font-bold'>The username or password is incorrect</p>
		{/if}
	</Box>
</div>
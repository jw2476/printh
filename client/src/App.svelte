<script lang='ts'>
	import Box from '$lib/Box.svelte';
	import Button from './lib/Button.svelte';
	import { route, socket } from '$lib/stores';
	import Login from './Login.svelte';
	import SignUp from './SignUp.svelte';
	import { authenticated } from '$lib/stores.js';
	import CodeScreen from './CodeScreen.svelte';
	import Cookies from 'js-cookie';
	import JoinGame from './JoinGame.svelte';
	import Game from './Game.svelte';
import HostGame from './HostGame.svelte';


	authenticated.subscribe((authed) => {
		if (authed)
			socket.emit('auth', Cookies.get('token'));
	});
</script>


{#if $route === "index"}
	<Box>
		<p class='text text-white text-7xl font-bold'>Printh</p>
		<p class='text text-xl text-indigo-200'>A fun quiz game</p>

		{#if !$authenticated}
			<Button onClick={() => route.set("login")}>Login</Button>
			<Button onClick={() => route.set("signup")}>Sign Up</Button>
		{:else}
			<Button onClick={() => route.set("codeScreen")}>Host a Game</Button>
			<Button onClick={() => route.set("joinGame")}>Join a Game</Button>
 		{/if}
	</Box>
{:else if $route === "login"}
	<Login />
{:else if $route === "signup"}
	<SignUp />
{:else if $route === "codeScreen"}
	<CodeScreen />
{:else if $route === "joinGame"}
	<JoinGame />
{:else if $route === "game"}
	<Game/>
{:else if $route === "hostGame"}
	<HostGame/>
{/if}

<style global='true'>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>
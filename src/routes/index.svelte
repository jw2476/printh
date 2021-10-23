<script lang='ts'>
	import Box from '../lib/components/Box.svelte';
	import Button from '../lib/components/Button.svelte';
	import Group from '../lib/components/Group.svelte';
	import Buttons from '../lib/components/Buttons.svelte';
	import Icon from 'svelte-awesome';
	import { faBrain, faSmile, faUsers } from '@fortawesome/free-solid-svg-icons';
	import { browser } from '$app/env';
	import { token } from '$lib/stores';
	import Notification from '../lib/components/Notification.svelte';
	import { onMount } from 'svelte';

	let signUpSuccess, loginSuccess = false;

	onMount(() => {
		if (browser) {
			signUpSuccess = JSON.parse(localStorage.getItem('signUpSuccess'));
			loginSuccess = JSON.parse(localStorage.getItem('loginSuccess'));
			token.set(localStorage.getItem('token'))

			localStorage.setItem('signUpSuccess', JSON.stringify(false));
			localStorage.setItem('loginSuccess', JSON.stringify(false));
		}
	})
</script>

<Notification bind:value={signUpSuccess} colour='green'>
	<p class='text-center text-white font-bold'>Sign Up Successful!</p>
</Notification>

<Notification bind:value={loginSuccess} colour='green'>
	<p class='text-center text-white font-bold'>Login Successful!</p>
</Notification>

<Box>
	<p class='text-7xl text-center text-white'>Printh</p>
	<p class='text-3xl text-center text-indigo-100'>A fun and educational quiz game</p>
	<Buttons>
		{#if !$token}
			<Button href='/login'>Login</Button>
			<Button href='/signup'>Sign Up</Button>
		{:else}
			<Button href='/host'>Host Game</Button>
			<Button href='/join'>Join Game</Button>
		{/if}
	</Buttons>
</Box>
<Group>
	<Box>
		<div class='text-white mx-auto'>
			<Icon data={faUsers} scale='{3}' />
		</div>
		<p class='text-3xl text-center text-white'>Collaborative</p>
		<p class='text-center text-white'>Work together with your classmates to solve puzzles, explore and defeat
			enemies</p>
	</Box>
	<Box>
		<div class='text-white mx-auto'>
			<Icon data={faBrain} scale='{3}' />
		</div>
		<p class='text-3xl text-center text-white'>Educational</p>
		<p class='text-center text-white'>Test your knowledge in a fun way with others with interactive battles</p>
	</Box>
	<Box>
		<div class='text-white mx-auto'>
			<Icon data={faSmile} scale='{3}' />
		</div>
		<p class='text-3xl text-center text-white'>Fun</p>
		<p class='text-center text-white'>Have fun while exploring the world of Aetheria and uncovering its
			secrets</p>
	</Box>
</Group>

<style global>
    @import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap'); /* Write your global styles here, in PostCSS syntax */
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    :root {
        font-family: "Nunito", serif;
    }

    p {
        font-weight: 600;
    }
</style>
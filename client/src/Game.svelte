<script lang='ts'>
	import Box from './lib/Box.svelte';
	import { onMount } from 'svelte';
	import { Application, Rectangle, Sprite } from 'pixi.js';

	let app: Application;
	let parent: HTMLElement;

	onMount(() => {
		app = new Application();
		parent.appendChild(app.view);

		const logo = Sprite.from('favicon.png');
		app.stage.addChild(logo);
	});
</script>

<Box>
	<div bind:this={parent}></div>
</Box>
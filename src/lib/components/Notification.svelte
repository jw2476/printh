{#if value}
<div class='mx-4 rounded-b-lg {main} py-2'>
	<button on:click={() => value = false} class='absolute top-0 right-4 h-6 w-6 {button} hover:{buttonHover} transition-colors duration-500 rounded-bl-md'>x</button>
	<slot />
</div>
{/if}

<script lang='ts'>
	export let colour: "green" | "red"
	export let value;

	let main, button, buttonHover;

	if (colour === "green") {
		main = "bg-green-500"
		button = "bg-green-300"
		buttonHover = "bg-green-400"
	} else if (colour === "red") {
		main = "bg-red-500"
		button = "bg-red-300"
		buttonHover = "bg-red-400"
	}
</script>
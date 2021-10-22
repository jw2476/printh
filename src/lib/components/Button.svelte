<a href={href}>
	<button on:click={handle} class='space-y-16 px-4 py-2 rounded-lg border border-white hover:bg-indigo-700 font-semibold text-white'>
		<slot />
	</button>
</a>

<script lang='ts'>
	export let href = '';
	export let handle: () => void = null;
</script>

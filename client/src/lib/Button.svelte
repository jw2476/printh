<button class='m-2 px-6 py-2 rounded-md bg-gray-900 border-gray-700 border' on:click={onClick}>
    <span class="text text-white">
        <slot/>
    </span>
</button>

<script lang="ts">
    export let onClick: () => void = null
</script>
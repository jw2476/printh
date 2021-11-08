<input type="password" placeholder={placeholder} bind:value={value} class="py-2 px-4 rounded-md outline-none">

<script lang="ts">
    export let placeholder: string
    export let value: string
</script>
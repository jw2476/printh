<script>
    import Box from "./lib/Box.svelte";
    import Input from "./lib/Input.svelte";
    import Button from "./lib/Button.svelte";
    import PasswordInput from "./lib/PasswordInput.svelte";
    import {route} from "./lib/stores";

    let username = ''
    let password = ''

    let emptyField = false
    let userNotFound = false

    async function submit() {
        emptyField = false
        userNotFound = false

        if (!username || !password) {
            emptyField = true
            return
        }

        const res = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        })

        switch (res.status) {
            case 200: {
                route.set("index")
                break
            }
            case 404: {
                userNotFound = true
            }
        }
    }
</script>
<div class="max-w-md mx-auto">
    <Box>
        <p class="text text-white font-bold text-3xl">Login</p>

        <p class="text text-gray-200 pt-4">Username</p>
        {#if emptyField && !username}
            <p class="text text-red-600">This field is required!</p>
        {/if}
        <Input placeholder="Amazing Username Goes Here" bind:value={username} />

        <p class="text text-gray-200">Password</p>
        {#if emptyField && !password}
            <p class="text text-red-600">This field is required!</p>
        {/if}
        <PasswordInput placeholder="*******" bind:value={password} />

        {#if userNotFound}
            <p class="text text-red-600">A user was not found with that username and password</p>
        {/if}
        <Button onClick={submit}>Submit</Button>
    </Box>
</div>
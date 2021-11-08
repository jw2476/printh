<script>
    import Box from "./lib/Box.svelte";
    import Input from "./lib/Input.svelte";
    import Button from "./lib/Button.svelte";
    import PasswordInput from "./lib/PasswordInput.svelte";
    import {route} from "./lib/stores";

    let username = ''
    let password = ''
    let passwordConfirm = ''

    let usernameTooLong = false
    let emptyField = false
    let usernameTaken = false

    async function submit() {
        usernameTooLong = false
        emptyField = false
        usernameTaken = false

        if (!username || !password) {
            emptyField = true
            return
        }

        if (username.length > 20) {
            usernameTooLong = true
            return
        }

        if (!(password === passwordConfirm)) {
            return
        }

        const res = await fetch("/api/signup", {
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
            case 409: {
                usernameTaken = true
                break
            }
        }
    }
</script>
<div class="max-w-md mx-auto">
    <Box>
        <p class="text text-white font-bold text-3xl">Sign Up</p>

        <p class="text text-gray-200 pt-4">Username</p>
        {#if usernameTooLong}
            <p class="text text-red-600">Too long!</p>
        {/if}
        {#if usernameTaken}
            <p class="text text-red-600">That username has been taken!</p>
        {/if}
        {#if emptyField && !username}
            <p class="text text-red-600">This field is required!</p>
        {/if}
        <Input placeholder="Amazing Username Goes Here" bind:value={username} />

        <p class="text text-gray-200">Password</p>
        {#if emptyField && !password}
            <p class="text text-red-600">This field is required!</p>
        {/if}
        <PasswordInput placeholder="*******" bind:value={password} />

        <p class="text text-gray-200">Confirm Password</p>
        {#if !(password === passwordConfirm)}
            <p class="text text-red-600">The passwords do not match!</p>
        {/if}
        <PasswordInput placeholder="*******" bind:value={passwordConfirm} />

        <Button onClick={submit}>Submit</Button>
    </Box>
</div>
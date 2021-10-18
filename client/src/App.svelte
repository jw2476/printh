<script lang="ts">
    import Box from "./components/Box.svelte";
    import Button from "./components/Button.svelte";
    import Group from "./components/Group.svelte";
    import Buttons from "./components/Buttons.svelte";
    import Icon from "svelte-awesome"
    import {faBrain, faSmile, faUsers} from "@fortawesome/free-solid-svg-icons";
</script>

<Box>
    <p class="text-7xl text-center text-white">Printh</p>
    <p class="text-3xl text-center text-indigo-100">A fun and educational quiz game</p>
    <Buttons>
        <Button>Sign Up</Button>
        <Button>Login</Button>
    </Buttons>
</Box>
<Group>
    <Box>
        <div class="text-white mx-auto">
            <Icon data={faUsers} scale="{3}"/>
        </div>
        <p class="text-3xl text-center text-white">Collaborative</p>
        <p class="text-center text-white">Work together with your classmates to solve puzzles, explore and defeat
            enemies</p>
    </Box>
    <Box>
        <div class="text-white mx-auto">
            <Icon data={faBrain} scale="{3}"/>
        </div>
        <p class="text-3xl text-center text-white">Educational</p>
        <p class="text-center text-white">Test your knowledge in a fun way with others with interactive battles</p>
    </Box>
    <Box>
        <div class="text-white mx-auto">
            <Icon data={faSmile} scale="{3}"/>
        </div>
        <p class="text-3xl text-center text-white">Fun</p>
        <p class="text-center text-white">Have fun while exploring the world of Aetheria and uncovering its
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
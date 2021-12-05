<script lang="ts">
import Box from "$lib/Box.svelte";

    import { TILE_WIDTH } from "$lib/Camera";
    import { GRID_SIZE } from "$lib/entity/Entity";

    import { World } from "$lib/entity/World";
    import { Background } from "$lib/map/Background";
import { MovePlayerData, Player } from "$lib/map/Player";
import { PacketOpcode } from "$lib/Packet";
    import { host, players, socket } from "$lib/stores";
import { Movable, MovableEntity } from "$lib/traits/Movable";
    import { Application } from "@pixi/app";

    import { onMount } from "svelte";

    let app: Application
    let parent: HTMLElement

    function sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    onMount(async () => {
        while (!host) {
            await sleep(100)
        } // Wait till startGame packet comes back with host ID

        app = new Application({
			width: TILE_WIDTH * GRID_SIZE,
			height: TILE_WIDTH * GRID_SIZE
		});
        parent.appendChild(app.view)

        const world = new World(app)

        new Background(world, {size: GRID_SIZE * 2})


        // Initialize players and monitor player movement
        for (const p of players!!) {
            const player = new Player(world, {
                pos: {x: 0, y: 0},
                userID: p.id
            }, false)
        }

        socket.on(PacketOpcode.MOVE_PLAYER, (data: MovePlayerData) => {
            const player = world.entities.find(e => e.id === data.id)!! as MovableEntity
            Movable.move(player, data.pos)
        })
        
    })
</script>

<Box>
	<div bind:this={parent}></div>
</Box>
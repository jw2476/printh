<script lang="ts">
import Box from "$lib/Box.svelte";
import Button from "$lib/Button.svelte";
import { currentCombat } from "$lib/stores";
import type { Enemy } from "$lib/traits/Hostile";

let phase: "selectAttack" | "selectEnemy" | "quiz" = "selectAttack"
let selectedAttack: string
let selectedEnemy: Enemy
</script>

<div>
    {#if phase === "selectAttack"}
        <!-- TODO: Auto generate attack boxes from class -->
        <Box>
            <p class="text text-white text-3xl">Basic Attack</p>
            <Button onClick={() => {selectedAttack = "basicAttack"; phase = "selectEnemy"}}>Select</Button>
        </Box>
    {/if}
    {#if phase === "selectEnemy"}
        {#each $currentCombat.enemies as enemy}
            <Box>
                <p class="text text-white text-3xl">{enemy.type[0].toUpperCase() + enemy.type.substring(1)}</p>
                <Button onClick={() => {selectedEnemy = enemy; phase = "quiz"}}>Select</Button>
            </Box>
        {/each}
    {/if}
</div>
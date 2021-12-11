<script lang="ts">
import Box from "$lib/Box.svelte";
import Button from "$lib/Button.svelte";
import { AttackPacketData, Attack } from "$lib/combat/combat";
import { Packet, PacketOpcode } from "$lib/Packet";
import { currentCombat, host, socket } from "$lib/stores";
import type { Enemy } from "$lib/traits/Hostile";
import { get } from "svelte/store";

type Question = {
    question: string
    answers: string[],
    correctAnswers: string[] // Remove or encrypt
}

let phase: "selectAttack" | "selectEnemy" | "quiz" = "selectAttack"
let selectedAttack: Attack | undefined
let selectedEnemy: Enemy | undefined

let question: Question | undefined
let correct = false
let showCorrect = false
let attackPower = 0
let questionsAnswered = 0

async function getQuestion() {
    question = await fetch("/api/game/question").then(res => res.json())
}

function checkQuestion(answer: string) {
    correct = question!!.correctAnswers.includes(answer)
    if (correct) {
        const id = setInterval(() => {
            attackPower += 0.5
            if (attackPower % 25 === 0) clearInterval(id)
        }, 5)
    }

    showCorrect = true
    setTimeout(() => {
        if (++questionsAnswered === 4) {
            attack()
        }

        showCorrect = false
        getQuestion()
    }, 1000)
}

function attack() {
    const thisPlayer = $currentCombat.players.find(player => player.interactive)

    phase = "selectAttack"
    const packet = new Packet<AttackPacketData>([host!!], PacketOpcode.ATTACK, {
        attacker: thisPlayer!!.id,
        attacked: selectedEnemy!!.id,
        attack: selectedAttack!!,
        attackPower: attackPower / 100 // Convert to decimal
    })
    socket.emit("packet", packet.encode())

    attackPower = 0
    questionsAnswered = 0
}
</script>

<div>
    <Box>
    {#if phase === "selectAttack"}
        <!-- TODO: Auto generate attack boxes from class -->
        <Box>
            <p class="text text-white text-3xl">Basic Attack</p>
            <Button onClick={() => {selectedAttack = Attack.BASIC_ATTACK; phase = "selectEnemy"}}>Select</Button>
        </Box>
    {/if}
    {#if phase === "selectEnemy"}
        {#each $currentCombat.enemies as enemy}
            <Box>
                <p class="text text-white text-3xl">{enemy.type[0].toUpperCase() + enemy.type.substring(1)}</p>
                <Button onClick={() => {selectedEnemy = enemy; phase = "quiz"; getQuestion()}}>Select</Button>
            </Box>
        {/each}
    {/if}
    {#if phase === "quiz" && question}
        <p class="text text-white text-3xl">{question.question}</p>
        {#if !showCorrect}
            {#each question?.answers as answer}
                <Button onClick={() => checkQuestion(answer)}>{answer}</Button>
            {/each}
        {:else}
            {#if correct}
                <p class="text text-green-500 text-3xl">Correct!</p>
            {:else}
                <p class="text text-red-500 text-3xl">Incorrect! Correct answers: {question.correctAnswers.toString().replaceAll("[", "")}</p>
            {/if}
        {/if}
        <p class="text text-white">Attack Power</p>
        <div class="relative pt-1">
            <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
                <div style="width:{attackPower}%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500 "></div>
            </div>
        </div>
    {/if}
    </Box>
</div>
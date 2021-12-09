import { EntityType, GRID_SIZE } from "$lib/entity/Entity";
import { TraitType } from "$lib/entity/Trait";
import type { World } from "$lib/entity/World";
import type { Player } from "$lib/map/Player";
import type { PlayMusicPacketData } from "$lib/Music";
import { Packet, PacketOpcode } from "$lib/Packet";
import type { Position } from "$lib/Position";
import { players, socket } from "$lib/stores";
import type { Enemy } from "$lib/traits/Hostile";
import { Movable } from "$lib/traits/Movable";


export type InitiateCombatPacketData = {
    playerPos: Position // Needed because movement updates for players are ignored client-side
}
export class Combat {
    world: World

    enemies: Enemy[] = []
    players: Player[] = []

    constructor(world: World, gridOrigin: Position) {
        this.world = world
        
        const entitiesInGrid = this.world.getEntitiesInRect(gridOrigin, {
            x: gridOrigin.x + GRID_SIZE,
            y: gridOrigin.y + GRID_SIZE
        })

        this.enemies = entitiesInGrid.filter(e => e.hasTrait(TraitType.HOSTILE)) as Enemy[]
        this.players = entitiesInGrid.filter(e => e.type === EntityType.PLAYER) as Player[]


        // Align enemies to right
        this.enemies.forEach((e: Enemy, i: number) => {
            e.inCombat = true
            const moveTo = {
                x: gridOrigin.x + (GRID_SIZE * 0.75),
                y: gridOrigin.y + ((GRID_SIZE / (this.enemies.length + 1)) * (i + 1)) - (e.size.y / 2)
            }
            Movable.move(e, moveTo)
        })

        // Align players to left
        this.players.forEach((p: Player, i: number) => {
            p.inCombat = true
            const moveTo = {
                x: gridOrigin.x + (GRID_SIZE * 0.25),
                y: gridOrigin.y + ((GRID_SIZE / (this.players.length + 1)) * (i + 1)) - (p.size.y / 2)
            }
            Movable.move(p, moveTo)

            const initiateCombat = new Packet<InitiateCombatPacketData>([p.data.userID], PacketOpcode.INITIATE_COMBAT, {
                playerPos: moveTo
            })
            socket.emit("packet", initiateCombat.encode())
        })

        

        const playCombatMusicPacket = new Packet<PlayMusicPacketData>(this.players.map(p => p.data.userID), PacketOpcode.PLAY_MUSIC, {
            song: "rude_buster.mp3",
            loop: true
        })
        socket.emit("packet", playCombatMusicPacket.encode())
    }
}
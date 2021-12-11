import { EntityType, GRID_SIZE } from "$lib/entity/Entity";
import { TraitType } from "$lib/entity/Trait";
import type { World } from "$lib/entity/World";
import type { Player } from "$lib/map/Player";
import { Packet, PacketOpcode } from "$lib/Packet";
import type { Position } from "$lib/Position";
import { iAmHost, players, socket } from "$lib/stores";
import type { Enemy } from "$lib/traits/Hostile";
import { Movable } from "$lib/traits/Movable";


function sleep(ms: number): Promise<null> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export type InitiateCombatPacketData = {
    gridOrigin: Position
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

        if (iAmHost()) {
            // Set all involved entities in combat
            this.enemies.forEach(e => e.combat = this)
            this.players.forEach(p => {
                p.combat = this

                const initiateCombat = new Packet<InitiateCombatPacketData>([p.data.userID], PacketOpcode.INITIATE_COMBAT, {
                    gridOrigin
                })
                socket.emit("packet", initiateCombat.encode())
            })

            // Align enemies to right
            this.enemies.forEach((e: Enemy, i: number) => {
                const moveTo = {
                    x: gridOrigin.x + (GRID_SIZE * 0.75),
                    y: gridOrigin.y + ((GRID_SIZE / (this.enemies.length + 1)) * (i + 1)) - (e.size.y / 2)
                }
                Movable.move(e, moveTo)
            })

            // Align players to left
            this.players.forEach((p: Player, i: number) => {
                const moveTo = {
                    x: gridOrigin.x + (GRID_SIZE * 0.25),
                    y: gridOrigin.y + ((GRID_SIZE / (this.players.length + 1)) * (i + 1)) - (p.size.y / 2)
                }
                Movable.move(p, moveTo)
            })
        }
    }
}
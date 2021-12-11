import { Entities } from "$lib/entity/Entities";
import { EntityType, GRID_SIZE } from "$lib/entity/Entity";
import { TraitType } from "$lib/entity/Trait";
import type { World } from "$lib/entity/World";
import type { Player } from "$lib/map/Player";
import { Packet, PacketOpcode } from "$lib/Packet";
import type { Position } from "$lib/Position";
import { iAmHost, socket } from "$lib/stores";
import type { Enemy } from "$lib/traits/Hostile";
import { Movable } from "$lib/traits/Movable";


function sleep(ms: number): Promise<null> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export type InitiateCombatPacketData = {
    gridOrigin: Position
}

export type AttackPacketData = {
    attacker: number,
    attacked: number,
    attack: Attack,
    attackPower: number
}

export enum Attack {
    BASIC_ATTACK = "basicAttack"
}
export class Combat {
    world: World

    enemies = new Entities<Enemy>()
    players = new Entities<Player>()

    constructor(world: World, gridOrigin: Position) {
        this.world = world
        
        const entitiesInGrid = this.world.getEntitiesInRect(gridOrigin, {
            x: gridOrigin.x + GRID_SIZE,
            y: gridOrigin.y + GRID_SIZE
        })

        this.enemies = entitiesInGrid.filter(e => e.hasTrait(TraitType.HOSTILE)) as Entities<Enemy>
        this.players = entitiesInGrid.filter(e => e.type === EntityType.PLAYER) as Entities<Player>

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

            socket.on(PacketOpcode.ATTACK, (data: AttackPacketData) => {
                const attacker = this.players.find(p => p.id === data.attacker)
                const attacked = this.enemies.find(e => e.id === data.attacked)

                if (!attacked || !attacker) return

                switch (data.attack) {
                    case(Attack.BASIC_ATTACK): {
                        console.log("From: " + attacked.health)
                        attacked.health -= 10 * data.attackPower
                        console.log("To: " + attacked.health)
                    }
                }
            })
        }
    }
}
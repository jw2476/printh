import { TILE_WIDTH } from "$lib/Camera";
import { Entity, EntityType, GRID_SIZE } from "$lib/entity/Entity";
import type { Player } from "$lib/map/Player";
import type { World } from "$lib/entity/World";
import { calcMagnitude, Position } from "$lib/Position";
import { Sprite } from "pixi.js";
import { Displayable } from "$lib/traits/Displayable";
import { Movable } from "$lib/traits/Movable";
import { iAmHost } from "$lib/stores";
import { Hostile } from "$lib/traits/Hostile";
import { Combat } from "$lib/combat/combat";

export type SlimeData = {
    pos: Position
}

export class Slime extends Entity<SlimeData> {
    pos: Position
    sprite = Sprite.from("/favicon.png")
    size = {x: 1, y: 1}

    frame = 0

    movingTowards?: Player
    combat?: Combat

    constructor(world: World, data: SlimeData, id?: number) {
        super(world, data, EntityType.SLIME, id)

        this.pos = data.pos

        this.traits.push(new Displayable(this))
        this.traits.push(new Movable(this))
        this.traits.push(new Hostile(this))
    }
    
    update(): void {
        if (iAmHost()) {
            this.frame = (this.frame + 1) % 60

            if (!this.combat) {
                // Check if player is within 5 squares
                this.movingTowards = undefined
                const players = this.world.entities.filter(e => e.type === EntityType.PLAYER) as Player[]
                players.forEach(player => {
                    const delta = {
                        x: this.pos.x - player.pos.x,
                        y: this.pos.y - player.pos.y
                    }
                    const magnitude = calcMagnitude(delta)
                    if (magnitude <= 5) {
                        this.movingTowards = player
                    }   
                })

                if (!this.movingTowards) {
                    this.idle()
                } else if (this.movingTowards) {
                    this.moveToPlayer()
                }
            }
        }
    }

    idle() {
        switch (this.frame) {
            case(0): {
                Movable.move(this, {x: this.pos.x + 1, y: this.pos.y})
                break
            } 
            case(30): {
                Movable.move(this, {x: this.pos.x - 1, y: this.pos.y})
                break
            }
        }
    }

    moveToPlayer() {
        if (this.frame % 15 !== 0) return
        const delta = {
            x: this.movingTowards!!.pos.x - this.pos.x,
            y: this.movingTowards!!.pos.y - this.pos.y
        }

        if (delta.x === 0 && delta.y === 0) {
            new Combat(this.world, {
                x: Math.floor(this.pos.x / GRID_SIZE) * GRID_SIZE,
                y: Math.floor(this.pos.y / GRID_SIZE) * GRID_SIZE
            })
            return
        }

        if (Math.abs(delta.x) > Math.abs(delta.y)) {
            Movable.move(this, {
                x: this.pos.x + (delta.x / Math.abs(delta.x)),
                y: this.pos.y
            })
        } else {
            Movable.move(this, {
                x: this.pos.x,
                y: this.pos.y + (delta.y / Math.abs(delta.y))
            })
        }
    }
}
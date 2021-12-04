import { TILE_WIDTH } from "$lib/Camera";
import { Entity, EntityType } from "$lib/map/Entity";
import type { Player } from "$lib/map/Player";
import type { World } from "$lib/map/World";
import { calcMagnitude, interpolate, Position } from "$lib/Position";
import { Sprite } from "pixi.js";

export enum SlimeState {
    IDLE,
    MOVING_TO_PLAYER
}

export class Slime implements Entity {
    world: World
    type = EntityType.SLIME
    pos: Position;
    sprite = Sprite.from("/favicon.png");
    cycle = 0
    state: SlimeState = SlimeState.IDLE

    movingTowards?: Player

    constructor(world: World, pos: Position) {
        this.world = world
        this.pos = pos

        const update = () => {
            let playerDetected = false
            const players = this.world.entities.filter((e) => e.type === EntityType.PLAYER)
            players.forEach((player) => {
                const delta = {
                    x: player.pos.x - this.pos.x,
                    y: player.pos.y - this.pos.y
                }

                const deltaMagnitude = calcMagnitude(delta)
                console.log(deltaMagnitude)
                if (deltaMagnitude / 64 <= 5) { // The divide by 64 it to turn it from real coords to grid tiles
                    this.state = SlimeState.MOVING_TO_PLAYER
                    this.movingTowards = player as Player
                    playerDetected = true
                }
            })
            if (playerDetected === false) {
                this.state = SlimeState.IDLE
            }

            switch (this.state) {
                case(SlimeState.IDLE): {
                    this.idle()
                    break
                }
                case(SlimeState.MOVING_TO_PLAYER): {
                    this.moveToPlayer()
                    break
                }
            }
        }
        setInterval(update.bind(this), 500)
    }

    idle() {
        switch (this.cycle) {
            case(0): {
                const moveTo = {
                    x: this.pos.x + TILE_WIDTH,
                    y: this.pos.y
                }
                interpolate(this.pos, moveTo, 32, 500)
                break
            }
            case(2): {
                const moveTo = {
                    x: this.pos.x - TILE_WIDTH,
                    y: this.pos.y
                }
                interpolate(this.pos, moveTo, 32, 500)
                break
            }
        }

        this.cycle = ++this.cycle % 4
    }

    moveToPlayer() {
        if (!this.movingTowards) return

        const delta = {
            x: this.movingTowards.pos.x - this.pos.x,
            y: this.movingTowards.pos.y - this.pos.y
        } // Slime to player
        
        console.log(delta)
        if (Math.abs(delta.x) > Math.abs(delta.y)) { // If X diff is bigger, move on X axis
            const moveTo = {
                x: this.pos.x + (delta.x / Math.abs(delta.x) * TILE_WIDTH),
                y: this.pos.y
            }
            interpolate(this.pos, moveTo, 16, 250)
        } else {
            const moveTo = {
                x: this.pos.x,
                y: this.pos.y + (delta.y / Math.abs(delta.y) * TILE_WIDTH)
            }
            interpolate(this.pos, moveTo, 16, 250)
        }
    }

    update(world: World): void {
        return
    }
}
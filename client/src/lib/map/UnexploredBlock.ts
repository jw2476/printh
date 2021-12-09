import { Entity, EntityType, GRID_SIZE } from "$lib/entity/Entity";
import type { World } from "$lib/entity/World";
import type { Position } from "$lib/Position";
import { Displayable } from "$lib/traits/Displayable";
import { Sprite, Texture } from "pixi.js";
import type { Player } from "./Player";

export class UnexploredBlock extends Entity<null> {
    pos: Position
    size = {x: GRID_SIZE, y: GRID_SIZE}
    sprite = Sprite.from(Texture.WHITE)

    constructor(world: World, pos: Position) {
        super(world, null, EntityType.UNEXPLORED_BLOCK)

        this.pos = pos

        this.traits.push(new Displayable(this))
    }

    update(): void {
        const players = this.world.entities.filter(e => e.type === EntityType.PLAYER) as Player[]
        players.forEach(player => {
            if (this.pos.x <= player.pos.x && player.pos.x < this.pos.x + GRID_SIZE) {
                if (this.pos.y <= player.pos.y && player.pos.y < this.pos.y + GRID_SIZE) {
                    const intervalID = setInterval(() => {
                        this.sprite.alpha -= 0.1
                        if (this.sprite.alpha === 0) {
                            clearInterval(intervalID)
                        }
                    }, 100)
                }
            }
        })
    }
}
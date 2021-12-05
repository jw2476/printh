import type { Application } from "pixi.js";
import { Key } from "./input/Key";
import { Entity, GRID_SIZE } from "$lib/entity/Entity";
import type { Position } from "./Position";
import type { World } from "./entity/World";
import { TraitType } from "./entity/Trait";
import type { DisplayableEntity } from "./traits/Displayable";

export const TILE_WIDTH = 64
export const SCREEN_WIDTH = TILE_WIDTH * GRID_SIZE
export const SCREEN_HEIGHT = TILE_WIDTH * GRID_SIZE

export class Camera {
    pos: Position

    constructor(pos: Position) {
        this.pos = pos
    }

    isPositionViewed(pos: Position): boolean {
        const viewedX = this.pos.x <= pos.x && pos.x < this.pos.x + SCREEN_WIDTH
        const viewedY = this.pos.y <= pos.y && pos.y < this.pos.y + SCREEN_HEIGHT
        return viewedX && viewedY
    }

    render(world: World) {
        const displayableEntities = world.entities.filter(e => e.hasTrait(TraitType.DISPLAYABLE)) as Array<DisplayableEntity>
        displayableEntities.forEach(e => {
            e.sprite.x = (e.pos.x - this.pos.x) * TILE_WIDTH,
            e.sprite.y = (e.pos.y - this.pos.y) * TILE_WIDTH
        })
    } 
}
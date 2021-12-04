import type { Application } from "pixi.js";
import { Key } from "./input/Key";
import { Entity, GRID_SIZE } from "./map/Entity";
import type { Position } from "./Position";

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

    render(app: Application, world: Entity[]) {
        world.forEach(e => {
            e.sprite.x = e.pos.x - this.pos.x
            e.sprite.y = e.pos.y - this.pos.y
        })
    } 
}
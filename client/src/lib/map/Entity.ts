import type { Position } from "$lib/Position"
import type { Sprite } from "pixi.js"
import type { World } from "./World"

export const GRID_SIZE = 10

export enum EntityType {
    PLAYER = 1,
    BACKGROUD,
    SLIME
}
export interface Entity {
    world: World
    type: EntityType
    pos: Position
    sprite: Sprite

    update(world: World): void
}
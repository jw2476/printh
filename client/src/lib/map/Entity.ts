import type { Position } from "$lib/Position"
import type { Sprite } from "pixi.js"

export const GRID_SIZE = 10

export enum EntityType {
    Nothing = 0,
    Player = 1,
    Backgroud = 2
}

export interface Entity {
    tileType: EntityType
    pos: Position
    sprite: Sprite

    update(): void
}
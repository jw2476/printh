import type { Sprite } from "pixi.js"

export const GRID_SIZE = 10

export enum GridTileType {
    Nothing = 0,
    Player = 1
}

export interface GridTile {
    tileType: GridTileType
    pos: {x: number, y: number}
    sprite: Sprite

    update(): void
}

export const grid: GridTile[] = []
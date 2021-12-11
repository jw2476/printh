import type { Position } from "$lib/Position"
import type { Sprite } from "pixi.js"
import type { Trait, TraitType } from "./Trait"
import type { World } from "./World"

export const GRID_SIZE = 10

export enum EntityType {
    PLAYER = "player",
    BACKGROUND = "background",
    SLIME = "slime",
    UNEXPLORED_BLOCK = "unexploredBlock"
}

export abstract class Entity<T> {
    private static nextID = 0

    id: number
    world: World
    data: T
    type: EntityType

    traits: Array<Trait<Entity<T>>> = []
    
    dead = false

    constructor(world: World, data: T, type: EntityType, id?: number) {
        this.world = world
        this.data = data
        this.type = type

        if (id) {
            this.id = id
        } else {
            this.id = Entity.nextID++
        }

        this.world.add(this)
    }

    hasTrait(traitType: TraitType): boolean {
        return !!this.traits.find(t => t.type === traitType)
    }

    exportData(): T {
        return this.data
    }
    abstract update(): void
}
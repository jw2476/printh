import type { Position } from "$lib/Position"
import type { Sprite } from "pixi.js"
import type { Trait, TraitType } from "./Trait"
import type { World } from "./World"

export const GRID_SIZE = 10

export enum EntityType {
    PLAYER = 1,
    BACKGROUD,
    SLIME
}

export abstract class Entity {
    private static nextID = 0

    id = Entity.nextID++
    world: World
    type: EntityType

    traits: Array<Trait<Entity>> = []

    constructor(world: World, type: EntityType) {
        this.world = world
        this.type = type

        this.world.add(this)
    }

    hasTrait(traitType: TraitType): boolean {
        return !!this.traits.find(t => t.type === traitType)
    }

    abstract update(): void
}
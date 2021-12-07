import type { Entity } from "./Entity";

export enum TraitType {
    DISPLAYABLE = "displayable",
    MOVABLE = "movable",
    STATEFUL = "stateful"
}

export abstract class Trait<E extends Entity<any>> {
    entity: E

    constructor(entity: E) {
        this.entity = entity

        this.setup()
    }

    abstract setup(): void
    abstract update(): void
    abstract type: TraitType
}
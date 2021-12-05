import type { Entity } from "./Entity";

export enum TraitType {
    DISPLAYABLE = "displayable"
}

export abstract class Trait<E extends Entity> {
    entity: E

    constructor(entity: E) {
        this.entity = entity
    }

    abstract setup(): void
    abstract update(): void
    abstract type: TraitType
}
import type { Entity } from "$lib/entity/Entity";
import { Trait, TraitType } from "$lib/entity/Trait";
import type { Position } from "$lib/Position";
import type { Sprite } from "pixi.js";
import type { DisplayableEntity } from "./Displayable";

type EnemyData = {
    inCombat: boolean,
    pos: Position,
}

export type Enemy = EnemyData & DisplayableEntity // Force all Hostile entities to have a sprite, size, etc

export class Hostile extends Trait<Enemy> {
    type = TraitType.HOSTILE;

    setup(): void {
        return
    }

    update(): void {
        return
    }    
}
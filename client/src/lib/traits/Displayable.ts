import type { Entity } from "$lib/entity/Entity";
import { Trait, TraitType } from "$lib/entity/Trait";
import type { Position } from "$lib/Position";
import type { Sprite } from "pixi.js";

type DisplayableData = {
    pos: Position
    sprite: Sprite,
    size: Position
}

export type DisplayableEntity = Entity<any> & DisplayableData

export class Displayable extends Trait<DisplayableEntity> {
    type = TraitType.DISPLAYABLE

    setup(): void {
        this.entity.world.app.stage.addChild(this.entity.sprite) // Just a bit of object traversal
    }

    update(): void {
        return
    }
    
    cleanup(): void {
        this.entity.world.app.stage.removeChild(this.entity.sprite)
    }
}
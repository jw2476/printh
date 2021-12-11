import type { Combat } from "$lib/combat/combat";
import { Trait, TraitType } from "$lib/entity/Trait";
import type { Position } from "$lib/Position";
import type { DisplayableEntity } from "./Displayable";

type EnemyData = {
    combat?: Combat,
    pos: Position,
    health: number
}

export type Enemy = EnemyData & DisplayableEntity // Force all Hostile entities to have a sprite, size, etc

export class Hostile extends Trait<Enemy> {
    type = TraitType.HOSTILE;

    setup(): void {
        return
    }

    update(): void {
        if (this.entity.health <= 0) {
            this.entity.world.remove(this.entity)
        }
    }   
    
    cleanup(): void {
        return
    }
}
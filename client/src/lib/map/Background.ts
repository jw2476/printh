import { Sprite } from "pixi.js";
import { Entity, EntityType } from "$lib/entity/Entity";
import type { World } from "$lib/entity/World";
import { Displayable } from "$lib/traits/Displayable";
import type { Position } from "$lib/Position";
import { TILE_WIDTH } from "$lib/Camera";

export type BackgroundData = {
    size: number
}

export class Background extends Entity<BackgroundData> {
    readonly pos: Position = {x: 0, y: 0}
    sprite = Sprite.from("/assets/img/bkg.png")

    /**
     * 
     * @param world World the entity belongs to
     * @param size The size of the background in grid tiles
     */
    constructor(world: World, data: BackgroundData, id?: number) {
        super(world, data, EntityType.BACKGROUND, id);

        this.sprite.width = data.size * TILE_WIDTH
        this.sprite.height = data.size * TILE_WIDTH

        this.traits.push(new Displayable(this))
    }

    update(): void {
        return
    }
}
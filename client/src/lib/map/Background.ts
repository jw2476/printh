import { Application, Sprite } from "pixi.js";
import { Entity, EntityType } from "./Entity";
import type { World } from "./World";

export class Backgroud implements Entity {
    world: World
    type = EntityType.BACKGROUD
    pos = {x: 0, y: 0};
    sprite = Sprite.from("/assets/img/bkg.png");

    constructor(world: World, size: number) {
        this.world = world
        this.sprite.width = size
        this.sprite.height = size
    }

    update(): void {
        return
    }
    
}
import { Application, Sprite } from "pixi.js";
import { Entity, EntityType } from "./Entity";
import type { World } from "./World";

export class Backgroud implements Entity {
    tileType = EntityType.Backgroud;
    pos = {x: 0, y: 0};
    sprite = Sprite.from("/assets/img/bkg.png");

    constructor(app: Application, size: number) {
        this.sprite.width = size
        this.sprite.height = size
    }

    update(_: World): void {
        return
    }
    
}
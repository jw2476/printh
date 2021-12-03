import { Camera } from "$lib/Camera";
import type { Application } from "pixi.js";
import type { Entity } from "./Entity";

export class World {
    entities: Entity[] = []
    camera = new Camera({x: 0, y: 0})

    constructor(app: Application) {
        const update = () => {
            this.camera.render(app, this.entities)
            console.log("test")
        }
        app.ticker.add(update.bind(this))
    }

    add(app: Application, e: Entity) {
        this.entities.push(e)
        app.stage.addChild(e.sprite)
    }
}
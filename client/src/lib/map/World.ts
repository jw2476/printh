import { Camera } from "$lib/Camera";
import type { Application } from "pixi.js";
import type { Entity } from "./Entity";

export class World {
    entities: Entity[] = []
    camera = new Camera({x: 0, y: 0})
    app: Application

    constructor(app: Application) {
        this.app = app

        const update = () => {
            this.entities.forEach(e => e.update(this))

            this.camera.render(this.app, this.entities)
        }
        this.app.ticker.add(update.bind(this))
    }

    add(e: Entity) {
        this.entities.push(e)
        this.app.stage.addChild(e.sprite)
    }
}
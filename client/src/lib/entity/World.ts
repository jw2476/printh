import { Camera } from "$lib/Camera";
import type { Application } from "pixi.js";
import type { Entity } from "./Entity";

export class World {

    app: Application

    entities: Entity[] = []

    constructor(app: Application) {
        this.app = app

        const update = () => {
            this.entities.forEach(e => {
                e.update()
                e.traits.forEach(t => t.update())
            }) // Update entity, then traits
        }
        this.app.ticker.add(update.bind(this))
    }



    add(e: Entity) {
        this.entities.push(e)
        e.traits.forEach(t => t.setup()) // Run trait setup method
    }
}
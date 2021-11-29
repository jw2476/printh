import { Key } from "$lib/input/Key";
import { Application, Sprite } from "pixi.js";
import { grid, GridTile, GridTileType } from "./Grid";
import { writable } from 'svelte/store';
import { Text } from "pixi.js";
import { socketVal } from "$lib/stores";

const MOVEMENT_LOCK_TIME = 250;


export class PlayerTile implements GridTile {
    pos = {x: 0, y: 0}
    sprite = Sprite.from('/favicon.png')
    readonly tileType = GridTileType.Player

    interactive: boolean
    username: string


    // Movement keys
    w = new Key("w")
	a = new Key("a")
	s = new Key("s")
	d = new Key("d")

    movementLock = false;


    constructor(app: Application, interactive: boolean, username: string) {            
        this.interactive = interactive
        this.username = username

        app.stage.addChild(this.sprite)
        let text = new Text(username)
        this.sprite.addChild(text)

        grid.push(this)

        socketVal.on("playerMove", ({username, x, y}) => {
            if (username === this.username) {
                this.pos.x = x
                this.pos.y = y
            }
        })
    }

    update() { 
        if (this.interactive) {
            if (this.w.isDown) this.move({y: -1})
            if (this.a.isDown) this.move({x: -1})
            if (this.s.isDown) this.move({y: 1})
            if (this.d.isDown) this.move({x: 1})
        }
    }

    move(d: {x?: number, y?: number}) {
        if (!this.movementLock) {
            this.movementLock = true
            setTimeout(() => {this.movementLock = false}, MOVEMENT_LOCK_TIME)
            let frames = 0
            const updateID = setInterval(() => {
                if (d.x) this.pos.x += d.x / 8 // Move player by eighth of total movement (change in x / interval(8))
                if (d.y) this.pos.y += d.y / 8

                socketVal.emit("playerMove", {username: this.username, x: this.pos.x, y: this.pos.y})

                if (++frames === 8) { // Used for animations and to stop the movement
                    clearInterval(updateID)
                }
            }, MOVEMENT_LOCK_TIME / 8)
        }
    };
}
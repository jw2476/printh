import { Key } from "$lib/input/Key";
import { Application, Sprite } from "pixi.js";
import { EntityType, Entity } from "./Entity";
import { Text } from "pixi.js";
import { socketVal } from "$lib/stores";
import { TILE_WIDTH } from "$lib/Camera";

const MOVEMENT_LOCK_TIME = 250;


export class Player implements Entity {
    pos = {x: 0, y: 0}
    sprite = Sprite.from('/favicon.png')
    readonly tileType = EntityType.Player

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

        let text = new Text(username)
        this.sprite.addChild(text)
        
        socketVal.on("playerMove", ({username, x, y}) => {
            if (username === this.username && !interactive) { // If this player and its not the client's player as that would already be handled
                this.move({x, y})
            }
        })
    }

    update() { 
        if (this.interactive) {
            if (this.w.isDown) this.move({x: this.pos.x, y: this.pos.y - TILE_WIDTH})
            if (this.a.isDown) this.move({x: this.pos.x - TILE_WIDTH, y: this.pos.y})
            if (this.s.isDown) this.move({x: this.pos.x, y: this.pos.y + TILE_WIDTH})
            if (this.d.isDown) this.move({x: this.pos.x + TILE_WIDTH, y: this.pos.y})
        }
    }

    move(pos: {x: number, y: number}) {
        if (!this.movementLock) {
            this.movementLock = true
            setTimeout(() => {this.movementLock = false}, MOVEMENT_LOCK_TIME)

            const d = {
                x: pos.x - this.pos.x,
                y: pos.y - this.pos.y
            } // Get position delta
    
            if (this.interactive) {
                socketVal.emit("playerMove", {username: this.username, x: pos.x, y: pos.y})
            }    

            let frames = 0
            const NUM_FRAMES = 16
            const updateID = setInterval(() => {
                if (d.x) this.pos.x += d.x / NUM_FRAMES // Move player by eighth of total movement (change in x / interval)
                if (d.y) this.pos.y += d.y / NUM_FRAMES

                if (++frames === NUM_FRAMES) { // Used for animations and to stop the movement
                    clearInterval(updateID)
                }
            }, MOVEMENT_LOCK_TIME / NUM_FRAMES)
        }
    };
}
import { Key } from "$lib/input/Key";
import { Application, Sprite } from "pixi.js";
import { EntityType, Entity } from "./Entity";
import { Text } from "pixi.js";
import { socketVal } from "$lib/stores";
import { SCREEN_HEIGHT, SCREEN_WIDTH, TILE_WIDTH } from "$lib/Camera";
import type { World } from "./World";
import { interpolate } from "$lib/Position";

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


    constructor(world: World, interactive: boolean, username: string) {            
        this.interactive = interactive
        this.username = username

        let text = new Text(username)
        this.sprite.addChild(text)
        
        socketVal.on("playerMove", ({username, x, y}) => {
            if (username === this.username && !interactive) { // If this player and its not the client's player as that would already be handled
                this.move(world, {x, y})
            }
        })
    }

    update(world: World) { 
        if (this.interactive) {
            if (this.w.isDown) this.move(world, {x: this.pos.x, y: this.pos.y - TILE_WIDTH})
            if (this.a.isDown) this.move(world, {x: this.pos.x - TILE_WIDTH, y: this.pos.y})
            if (this.s.isDown) this.move(world, {x: this.pos.x, y: this.pos.y + TILE_WIDTH})
            if (this.d.isDown) this.move(world, {x: this.pos.x + TILE_WIDTH, y: this.pos.y})
        }
    }

    move(world: World, pos: {x: number, y: number}) {
        if (!this.movementLock) {
            this.movementLock = true

            if (this.interactive && !world.camera.isPositionViewed(pos)) { // Controlling player moves out of bounds
                const delta = {
                    x: pos.x - this.pos.x,
                    y: pos.y - this.pos.y
                }

                const magnitude = Math.abs(delta.x + delta.y) // I know this isn't a proper magnitude, but since only one will have a non-zero value it works
                const normalizedDelta = {
                    x: delta.x / magnitude,
                    y: delta.y / magnitude
                }

                const newCameraPos = {
                    x: world.camera.pos.x + (normalizedDelta.x * SCREEN_WIDTH),
                    y: world.camera.pos.y + (normalizedDelta.y * SCREEN_HEIGHT)
                }
                interpolate(world.camera.pos, newCameraPos, 32, MOVEMENT_LOCK_TIME)
            }

            setTimeout(() => {this.movementLock = false}, MOVEMENT_LOCK_TIME)

            if (this.interactive) {
                socketVal.emit("playerMove", {username: this.username, x: pos.x, y: pos.y})
            }    

            interpolate(this.pos, pos, 16, MOVEMENT_LOCK_TIME)
        }
    };
}
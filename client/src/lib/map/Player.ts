import { Key } from "$lib/input/Key";
import { Sprite, Text } from "pixi.js";
import { Entity, EntityType, GRID_SIZE } from "$lib/entity/Entity";
import type { World } from "$lib/entity/World";
import { interpolate, Position } from "$lib/Position";
import { Movable } from "$lib/traits/Movable";
import { Displayable } from "$lib/traits/Displayable";
import { Packet, PacketOpcode } from "$lib/Packet";
import { host, socket } from "$lib/stores";
import { TILE_WIDTH } from "$lib/Camera";
import type { InitiateCombatPacketData } from "$lib/combat/combat";

const MOVEMENT_LOCK_TIME = 250;

export type PlayerData = {
    pos: Position,
    userID: string,
    username: string
}

export type MovePlayerData = {
    id: number,
    pos: Position
}

export class Player extends Entity<PlayerData> {
    type = EntityType.PLAYER
    pos: Position
    size = {x: 1, y: 1}
    sprite = Sprite.from("/favicon.png")
    interactive: boolean

    w = new Key("w")
    a = new Key("a")
    s = new Key("s")
    d = new Key("d")
    movementLock = false
    movingTo?: Position

    inCombat = false
    

    constructor(world: World, data: PlayerData, interactive: boolean, id?: number) {
        super(world, data, EntityType.PLAYER, id);

        this.interactive = interactive

        this.pos = data.pos
        this.traits.push(new Movable(this))
        this.traits.push(new Displayable(this))

        const text = new Text(data.username, {
            fontSize: 20,
            fontFamily: "system-ui"
        })
        text.y -= text.height // Place above sprite
        text.x += (TILE_WIDTH - text.width) / 2
        this.sprite.addChild(text)

        socket.on(PacketOpcode.INITIATE_COMBAT, (data: InitiateCombatPacketData) => {
            this.inCombat = true
            interpolate(this.pos, data.playerPos, 16, 250)
        })
    }

    update(): void {
        if (this.interactive && !this.inCombat) {
            if (this.w.isDown) this.move({x: this.pos.x, y: this.pos.y - 1})
            if (this.s.isDown) this.move({x: this.pos.x, y: this.pos.y + 1})

            if (this.a.isDown) this.move({x: this.pos.x - 1, y: this.pos.y})
            if (this.d.isDown) this.move({x: this.pos.x + 1, y: this.pos.y})
        }
    }

    move(to: Position) {
        if (!this.movementLock) {
            this.movementLock = true

            if (this.interactive && !this.world.camera.isPositionViewed(to)) { // Controlling player moves out of bounds
                const delta = {
                    x: to.x - this.pos.x,
                    y: to.y - this.pos.y
                }

                const magnitude = Math.abs(delta.x + delta.y) // I know this isn't a proper magnitude, but since only one will have a non-zero value it works
                const normalizedDelta = {
                    x: delta.x / magnitude,
                    y: delta.y / magnitude
                }

                const newCameraPos = {
                    x: this.world.camera.pos.x + (normalizedDelta.x * GRID_SIZE),
                    y: this.world.camera.pos.y + (normalizedDelta.y * GRID_SIZE)
                }
                interpolate(this.world.camera.pos, newCameraPos, 32, MOVEMENT_LOCK_TIME)
            }

            setTimeout(() => this.movementLock = false, 250)

            const packet = new Packet<MovePlayerData>([host!!], PacketOpcode.MOVE_PLAYER, {
                id: this.id,
                pos: to
            })
            socket.emit("packet", packet.encode())
            this.movingTo = to
            console.log(to.x)
            interpolate(this.pos, to, 16, 250)
        }
    }
}
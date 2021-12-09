import { Camera } from "$lib/Camera";
import { Slime } from "$lib/enemies/Slime";
import { Background } from "$lib/map/Background";
import { Player } from "$lib/map/Player";
import { Packet, PacketOpcode } from "$lib/Packet";
import type { Position } from "$lib/Position";
import { host, iAmHost, me, players, socket } from "$lib/stores";
import type { DisplayableEntity } from "$lib/traits/Displayable";
import type { Application } from "pixi.js";
import { Entity, EntityType } from "./Entity";
import { TraitType } from "./Trait";

type RegisterEntityPacketData = {
    id: number,
    type: EntityType
    data: any
}
export class World {

    app: Application
    camera: Camera

    entities: Entity<any>[] = []

    constructor(app: Application, zoom: number) {
        this.app = app
        this.camera = new Camera({x: 0, y: 0}, zoom)

        const update = () => {
            this.entities.forEach(e => {
                e.update()
                e.traits.forEach(t => t.update())
            }) // Update entity, then traits
            this.camera.render(this)
        }
        this.app.ticker.add(update.bind(this))

        socket.on(PacketOpcode.REGISTER_ENTITY, (packet: RegisterEntityPacketData) => {
            switch (packet.type) {
                case (EntityType.BACKGROUND): {
                    new Background(this, packet.data, packet.id)
                    break
                }
                case (EntityType.PLAYER): {
                    new Player(this, packet.data, packet.data.userID === me?.id, packet.id)
                    break
                }
                case (EntityType.SLIME): {
                    new Slime(this, packet.data, packet.id)
                    break
                }
            }
        })
    }

    add(e: Entity<any>) {
        this.entities.push(e)
        e.traits.forEach(t => t.setup()) // Run trait setup method

        if (iAmHost()) {
            const packet = new Packet<RegisterEntityPacketData>(players!!.map(p => p.id), PacketOpcode.REGISTER_ENTITY, {
                id: e.id,
                type: e.type,
                data: e.exportData()
            })

            socket.emit("packet", packet.encode())
        }
    }

    getEntitiesInRect(pos: Position, size: Position): Entity<any>[] {
        const displayables = this.entities.filter(e => e.hasTrait(TraitType.DISPLAYABLE)) as DisplayableEntity[]
        return displayables.filter(e => {
            if (pos.x <= e.pos.x && e.pos.x < pos.x + size.x) {
                if (pos.y <= e.pos.y && e.pos.y < pos.y + size.y) {
                    return true
                }
            }
        })
    }
}
import { Camera } from "$lib/Camera";
import { Slime } from "$lib/enemies/Slime";
import { Background } from "$lib/map/Background";
import { Player } from "$lib/map/Player";
import { Packet, PacketOpcode } from "$lib/Packet";
import { host, iAmHost, me, players, socket } from "$lib/stores";
import type { Application } from "pixi.js";
import { Entity, EntityType } from "./Entity";

type RegisterEntityPacketData = {
    id: number,
    type: EntityType
    data: any
}
export class World {

    app: Application
    camera = new Camera({x: 0, y: 0})

    entities: Entity<any>[] = []

    constructor(app: Application) {
        this.app = app

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
}
import { Packet, PacketOpcode } from "$lib/Packet";
import { iAmHost, players, socket } from "$lib/stores";
import type { Entity } from "./Entity";

export type DeregisterEntityPacketData = {
    id: number
}

export class Entities<E extends Entity<any>> extends Array<E> {
    constructor() {
        super()
        socket.on(PacketOpcode.DEREGISTER_ENTITY, (data: DeregisterEntityPacketData) => {
            const entity = this.find(e => e.id === data.id)
            if (!entity) return
            this.deregisterEntity(entity)
        })
    }

    deregisterEntity(e: E) {
        // Run cleanup and notify players but only once
        if (!e.dead) {
            e.dead = true
            e.traits.forEach(t => t.cleanup())

            if (iAmHost()) {
                const packet = new Packet<DeregisterEntityPacketData>(players!!.map(p => p.id), PacketOpcode.DEREGISTER_ENTITY, {
                    id: e.id
                })
                socket.emit("packet", packet.encode())
            }
        }
        
        const idx = this.indexOf(e)
        if (idx > -1) {
            this.splice(idx, 1);
        }
    }
}
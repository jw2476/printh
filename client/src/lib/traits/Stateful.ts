import type { Entity } from "$lib/entity/Entity"
import { Trait, TraitType } from "$lib/entity/Trait"
import { Packet, PacketOpcode } from "$lib/Packet"
import { players, socket } from "$lib/stores"

type StateData = {
    state: any
}

export type StateEntity = Entity<any> & StateData

export type ChangeStatePacketData = {
    id: number,
    state: any
}

export class Stateful extends Trait<StateEntity> {
    type = TraitType.STATEFUL

    setup(): void {
        socket.on(PacketOpcode.CHANGE_STATE, (data: ChangeStatePacketData) => {
            if (this.entity.id === data.id) {
                this.entity.state = data.state
            }
        })
    }

    update(): void {
        return
    }

    static changeState(entity: StateEntity, state: any) {
        entity.state = state

        const packet = new Packet<ChangeStatePacketData>(players!!.map(p => p.id), PacketOpcode.CHANGE_STATE, {
            id: entity.id,
            state: entity.state
        })
        socket.emit("packet", packet.encode())
    }
}
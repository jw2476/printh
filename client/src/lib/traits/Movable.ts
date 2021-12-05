import { Entity, EntityType } from "$lib/entity/Entity";
import { Trait, TraitType } from "$lib/entity/Trait";
import { Packet, PacketOpcode } from "$lib/Packet";
import { interpolate, Position } from "$lib/Position";
import { host, iAmHost, me, players, socket } from "$lib/stores";

type MovableData = {
    pos: Position
}

export type MovableEntity = MovableData & Entity<any>

type MovablePacketData = {
    id: number,
    pos: Position
}

export class Movable extends Trait<MovableEntity> {
    type = TraitType.MOVABLE;

    setup(): void {
        socket.on(PacketOpcode.MOVE, (data: MovablePacketData) => {
            const interactivePlayer = this.entity.type === EntityType.PLAYER && me?.id === this.entity.data.userID // Ignore server movement 
            if (this.entity.id === data.id && !interactivePlayer) {
                interpolate(this.entity.pos, data.pos, 16, 250)
            }
        })
    }

    update(): void {
        return
    }
    
    static move(entity: MovableEntity, to: Position) {
        if (iAmHost()) {
            entity.pos = to

            const packet = new Packet<MovablePacketData>(players!!.map(p => p.id), PacketOpcode.MOVE, {
                id: entity.id,
                pos: to
            })

            socket.emit("packet", packet.encode())
        }
    }
}
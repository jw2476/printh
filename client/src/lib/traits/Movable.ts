import { Entity, EntityType } from "$lib/entity/Entity";
import { Trait, TraitType } from "$lib/entity/Trait";
import type { Player, PlayerData } from "$lib/map/Player";
import { Packet, PacketOpcode } from "$lib/Packet";
import { interpolate, Position } from "$lib/Position";
import { host, iAmHost, me, players, socket } from "$lib/stores";

type MovableData = {
    pos: Position
}

export type MovableEntity = MovableData & Entity<any>

type MovablePacketData = {
    id: number,
    pos: Position,
}

export class Movable extends Trait<MovableEntity> {
    type = TraitType.MOVABLE;
    movementQueue: Position[] = []
    moving = false

    setup(): void {
        socket.on(PacketOpcode.MOVE, (data: MovablePacketData) => {
            if (this.entity.id === data.id) {
                const isThisPlayer = this.entity.type === EntityType.PLAYER && me?.id === this.entity.data.userID 
                const thisPlayerInCombat = isThisPlayer && (this.entity as Player).combat
                if (!isThisPlayer || thisPlayerInCombat) {
                    this.movementQueue.push(data.pos)
                }
            }
        })
    }

    update(): void {
        if (!this.moving && this.movementQueue.length !== 0) {
            this.moving = true
            interpolate(this.entity.pos, this.movementQueue.shift()!!, 16, 250).then(() => this.moving = false)
        }
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
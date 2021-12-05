export enum PacketOpcode {
    MOVE = "move",
    REGISTER_ENTITY = "registerEntity",
    MOVE_PLAYER = "movePlayer"
}

export class Packet<T> {
    to: string[]
    opcode: PacketOpcode
    data: T

    constructor(to: string[], opcode: PacketOpcode, data: T) {
        this.to = to
        this.opcode = opcode
        this.data = data
    }

    encode(): any {
        return {
            to: this.to,
            opcode: this.opcode,
            data: this.data
        }
    }
}
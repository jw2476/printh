import { Game } from "../models/Game.js";
import { ISocket, userIDToSocket } from "./ISocket.js";

export async function playerMove(socket: ISocket, payload: {username: string, x: number, y: number}) {
    const game = await Game.findOne({players: socket.user._id})

    if (!game) return

    for (const player of game.players) {
        const playerSocket = userIDToSocket[player._id]
        playerSocket.ws.emit("playerMove", payload)
    }
}
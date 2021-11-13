import { ISocket, userIDToSocket } from './ISocket.js';
import { Game } from '../models/Game.js';

export async function startGame(socket: ISocket) {
	const hostID = socket.user._id;
	const game = await Game.findOne({ host: hostID });
	if (!game) {
		return;
	}

	for (const player of game.players) {
		const playerSocket = userIDToSocket[player._id];
		playerSocket?.ws.emit('startGame');
	}
}
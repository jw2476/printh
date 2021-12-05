import { ISocket, userIDToSocket } from './ISocket.js';
import { Game } from '../models/Game.js';

export async function startGame(socket: ISocket) {
	const hostID = socket.user._id;
	const game = await Game.findOne({ host: hostID });
	if (!game) {
		return;
	}

	const allPlayers = game.players.map(player => {
        return {
            username: player.username,
            id: player._id
        }
    })
	const host = game.host._id

	for (const player of game.players) {
		const playerSocket = userIDToSocket[player._id];

		const players = allPlayers.filter(p => p.id !== player._id) // Remove this player

		playerSocket?.ws.emit('startGame', {
			players,
			host
		});
	}

	console.log(host)

	userIDToSocket[host]?.ws.emit('startGame', {
		players: allPlayers,
		host
	})
}
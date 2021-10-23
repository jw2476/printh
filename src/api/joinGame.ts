import type { Request, Response } from 'express';
import { Game } from '$lib/models/Game';
import { getSocket } from '$lib/sockets';
import { io } from '$lib/io';

export async function joinGame(req: Request, res: Response) {
	const code = parseInt(req.query.code as string)

	const game = await Game.findOne({ code });
	if (!game) {
		res.sendStatus(404)
		return
	}

  // Add to DB
	game.players.push(res.locals.user._id)
	await game.save()

	// Add player socket to game room
	const playerSocket = getSocket(res.locals.user._id)
	playerSocket.join(game.code.toString())

	res.sendStatus(200)
}
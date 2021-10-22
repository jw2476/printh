import type { Request, Response } from 'express';
import { Game } from '$lib/models/Game';
import { getSocket } from '$lib/sockets';

export async function joinGame(req: Request, res: Response) {
	const code = parseInt(req.query.code as string)

	const game = await Game.findOne({ code });
	if (!game) {
		res.sendStatus(404)
		return
	}

	const ownerSocket = getSocket(game.owner._id)
	if (ownerSocket) console.log("Owner socket found")
	ownerSocket.emit("playerJoined", res.locals.user.username)

	game.players.push(res.locals.user._id)
	await game.save()

	res.sendStatus(200)
}
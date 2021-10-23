import type { Request, Response } from 'express';
import { Game } from '$lib/models/Game';
import { io } from '$lib/io';

export async function startGame(req: Request, res: Response) {
	const code = req.query.code as string
	const game = await Game.findOne({code})
	if (!game) {
		res.sendStatus(404)
	} else {
		io.in(code).emit("startGame")
		console.log(await io.in(code).allSockets())
		res.sendStatus(200)
	}
}
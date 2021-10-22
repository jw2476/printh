import type { Request,Response } from 'express';
import { Game, IGame } from '$lib/models/Game';

export async function generateCode(req: Request, res: Response): Promise<void> {
	const existingGame: IGame = await Game.findOne({owner: res.locals.user._id})
	if (existingGame) {
		existingGame.delete()
	}

	const code = Math.floor(Math.random() * 1000000)
	await new Game({
		code,
		owner: res.locals.user._id,
		players: []
	}).save()
	res.json(code)
}

import type { Request, Response } from 'express';
import { Game, IGame } from '$lib/models/Game';
import type { IUser } from '$lib/models/User';

export async function players(req: Request, res: Response) {
	const code = req.query.code as string
	const game: IGame = await Game.findOne({code}).populate("players")
	if (!game) {
		res.sendStatus(404)
	} else {
		res.json(game.players.map((player) => (player as IUser).username))
	}
}
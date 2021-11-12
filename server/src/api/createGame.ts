import { Request, Response } from 'express';
import { Game } from '../models/Game.js';

const CODE_LENGTH = 6

export async function createGame(req: Request, res: Response) {
	const existingGame = await Game.findOne({host: res.locals.user._id})
	if (existingGame) {
		await existingGame.delete()
	}

	const code = Math.floor(Math.random() * 10**CODE_LENGTH)
	await new Game({
		code,
		host: res.locals.user
	}).save()

	res.json({code})
}
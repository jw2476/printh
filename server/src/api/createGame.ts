import { Request, Response } from 'express';

export async function createGame(req: Request, res: Response) {
	console.log(res.locals.user.username)
	res.sendStatus(200)
}
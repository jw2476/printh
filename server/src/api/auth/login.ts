import { User } from '../../models/User.js';
import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export async function login(req: Request, res: Response): Promise<void> {
	const { username, password } = req.body;

	const user = await User.findOne({ username, password });
	if (!user) {
		res.sendStatus(404);
		return;
	}

	const token = jwt.sign(user._id.toString(), process.env['SECRET']);

	res.json({ token });
}
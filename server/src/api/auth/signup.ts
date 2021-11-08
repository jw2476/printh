import { User } from '../../models/User.js';
import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export async function signup(req: Request, res: Response): Promise<void> {
	const { username, password } = req.body;

	const existingUser = await User.findOne({ username });
	if (existingUser) {
		res.sendStatus(409);
		return;
	}

	const user = await new User({
		username,
		password
	}).save();

	const token = jwt.sign(user._id.toString(), process.env['SECRET']);

	res.json({ token });
}
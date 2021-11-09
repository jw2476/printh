import { User } from '../../models/User.js';
import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { compareSync, hashSync } from 'bcrypt';

dotenv.config();
const {
	SECRET
} = process.env

export async function login(req: Request, res: Response): Promise<void> {
	const { username, password } = req.body;


	const user = await User.findOne({ username });

	if (!user || !compareSync(password, user?.password)) {
		res.sendStatus(404);
		return;
	}

	const token = jwt.sign(user._id.toString(), SECRET);
	res.cookie('token', token)

	res.sendStatus(200)
}
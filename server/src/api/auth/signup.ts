import { User } from '../../models/User.js';
import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { genSaltSync, hashSync } from 'bcrypt';

dotenv.config();
const {
	SECRET
} = process.env

export async function signup(req: Request, res: Response): Promise<void> {
	const { username, password } = req.body;

	const existingUser = await User.findOne({ username });
	if (existingUser) {
		res.sendStatus(409);
		return;
	}

	const hash = hashSync(password, 10)

	const user = await new User({
		username,
		password: hash
	}).save();

	const token = jwt.sign(user._id.toString(), SECRET);
	res.cookie('token', token)

	res.sendStatus(200)
}
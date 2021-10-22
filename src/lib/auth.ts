import type { IUser } from '$lib/models/User';
import { User } from '$lib/models/User';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

export async function authenticate(token: string): Promise<IUser | null> {
	const username = jwt.verify(token, process.env["SECRET"]) as string
	return User.findOne({ username });
}
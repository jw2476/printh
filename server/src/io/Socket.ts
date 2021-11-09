import { Socket as WebSocket } from 'socket.io';
import { IUser, User } from '../models/User.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()
const {
	SECRET
} = process.env

export interface ISocket {
	ws: WebSocket
	user: IUser
}

export class Socket implements ISocket {
	ws: WebSocket;
	user: IUser;

	constructor(ws: WebSocket) {
		this.ws = ws

		ws.on('auth', async (token: string) => {
			const username = jwt.verify(token, SECRET) as string
			this.user = await User.findOne({ username })
		})
	}
}
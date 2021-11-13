import { Socket as WebSocket } from 'socket.io';
import { IUser, User } from '../models/User.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Message } from '../common/Message.js';
import { Game } from '../models/Game.js';

dotenv.config()
const {
	SECRET
} = process.env

export interface ISocket {
	ws: WebSocket
	user: IUser
}

export const userIDToSocket: Record<string, Socket> = {}

export class Socket implements ISocket {
	ws: WebSocket;
	user: IUser;

	constructor(ws: WebSocket) {
		this.ws = ws

		ws.on('auth', async (token: string) => {
			const _id = jwt.verify(token, SECRET) as string
			this.user = await User.findOne({ _id })
			if (!this.user) {
				this.ws.disconnect()
				return
			}
			userIDToSocket[this.user._id] = this
			console.log(`Socket Connection as ${this.user.username}`)
		})

		ws.on('message', async (msg: Message<any>) => {
			const game = await Game.findOne({ code: msg.game })
			if (!game) return

			if (msg.to === "host") {
				userIDToSocket[game.host._id].ws.emit(msg.name, {
					from: this.user,
					data: msg.data
				})
				console.log("message sent to host")
			}
		})

		ws.on('joinGame', async (msg: {code: number}) => {
			const game = await Game.findOne({ code: msg.code }).populate('players')
			if (!game) return

			game.players.push(this.user)
			await game.save()

			userIDToSocket[game.host._id].ws.emit('updatePlayers', game.players)
		})

		ws.on('disconnect', async () => {
			const game = await Game.findOne({ players: this.user?._id }).populate('players')
			if (!game) return

			game.players = game.players.filter(player => player._id.toString() !== this.user?._id.toString())
			await game.save()

			userIDToSocket[game.host._id]?.ws.emit('updatePlayers', game.players)
		})
	}
}
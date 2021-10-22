import type { Socket } from 'socket.io';
import { Server } from 'socket.io';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { getSocket, sockets } from '$lib/sockets';
import { Game, IGame } from '$lib/models/Game';
import { IUser, User } from '$lib/models/User';

dotenv.config()

export const io = new Server()

io.on("connect", (socket: Socket) => {
	console.log("Socket Connected!")

	socket.on("auth", (token: string) => {
		const userID = jwt.verify(token, process.env["SECRET"]) as string
		sockets[userID] = socket.id
		console.log("Socket Authenticated")
	})

	socket.on("disconnect", async () => {
		const userID = Object.keys(sockets).find(key => sockets[key] === socket.id)
		const user: IUser = await User.findOne({_id: userID})
		console.log(`${user?.username} has disconnected`)

		// Delete owned game
		const ownedGame = await Game.findOne({owner: userID})
		if (ownedGame) {
			ownedGame.deleteOne()
		}

		// Leave any current games and notify owner
		const currentGames: IGame[] = await Game.find({players: userID})
		for (const currentGame of currentGames) {
			let idx = currentGame.players.indexOf(userID)
			currentGame.players.splice(idx, 1)
			await currentGame.save()

			const ownerSocket = getSocket(currentGame.owner._id)
			ownerSocket?.emit("playerLeft", user.username)
		}
	})
})
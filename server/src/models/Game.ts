import { IUser } from './User.js';
import mongoose from 'mongoose';
const { model, Schema } = mongoose

type IGameBase = {
	code: number
	players: Array<IUser>,
	host: IUser
}

export type IGame = IGameBase & Document

const gameSchema = new Schema({
	code: Number,
	players: [{ type: Schema.Types.ObjectId, ref: "User" }],
	host: { type: Schema.Types.ObjectId, ref: "User" }
})

export const Game = model<IGame>("Game", gameSchema)
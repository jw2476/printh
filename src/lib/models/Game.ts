import type { IUser } from '$lib/models/User';
import { Document, model, Schema } from 'mongoose';

const { ObjectId } = Schema.Types;

type IGameBase = {
	owner: IUser | string
	players: Array<IUser | string>
	code: string
}

export type IGame = IGameBase & Document

const gameSchema = new Schema({
	owner: { type: ObjectId, ref: 'User' },
	players: [{ type: ObjectId, ref: 'User' }],
	code: Number
});

export const Game = model<IGame>('Game', gameSchema);
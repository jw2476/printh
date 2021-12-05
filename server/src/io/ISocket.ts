import { Socket as WebSocket } from 'socket.io/dist/socket.js';
import { IUser } from '../models/User.js';

export const userIDToSocket: Record<string, ISocket> = {}
export interface ISocket {
	ws: WebSocket
	user: IUser
}
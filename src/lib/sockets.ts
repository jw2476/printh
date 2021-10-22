import type { Socket } from 'socket.io';
import { io } from '$lib/io';

export const sockets: Record<string, string> = {}

export function getSocket(username: string): Socket | null {
	return io.sockets.sockets.get(sockets[username])
}
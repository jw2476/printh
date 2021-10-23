import { writable } from 'svelte/store';
import { browser } from '$app/env';
import type { Socket } from 'socket.io-client';
import io from 'socket.io-client';


export const token = writable<string>();
export let socket = writable<Socket>();

if (browser) {
	token.set(localStorage.getItem('token'));
	socket.set(io());
}

// Socket auth
let auth = false

let tokenVal: string;
token.subscribe(t => tokenVal = t);
let socketVal: Socket;
socket.subscribe(s => socketVal = s);



token.subscribe(() => authSocket(socketVal))
socket.subscribe(authSocket);


function authSocket(s: Socket) {
	if (s && tokenVal && !auth) {
		s.emit('auth', tokenVal);
		auth = true
	}
}
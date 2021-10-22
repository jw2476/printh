import { writable } from 'svelte/store';
import { browser } from '$app/env';
import type { Socket } from 'socket.io-client';
import io from "socket.io-client"


export const token = writable<string>()
export let socket = writable<Socket>()

let tokenVal: string
token.subscribe(t => tokenVal = t)

if (browser) {
	token.set(localStorage.getItem("token"))
	socket.set(io())
}

socket.subscribe(s => {
	if (s && tokenVal) {
		s.emit('auth', tokenVal);
	}
})

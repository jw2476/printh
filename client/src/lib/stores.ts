import {writable} from "svelte/store";
import Cookies from 'js-cookie';
import type { Socket } from "socket.io";

export const route = writable<string>("index")
export const authenticated = writable(false)
export const socket = writable<Socket>()
export let socketVal: Socket;

socket.subscribe(s => socketVal = s)

authenticated.set(!!Cookies.get("token"))
route.subscribe(_ => { // Update authenticated on page change
	authenticated.set(!!Cookies.get("token"))
})

// Fancy back button code
route.subscribe(r => {
	window.history.pushState(r, "", "/")
})

window.addEventListener("popstate", (e) => {
	route.set(e.state)
})

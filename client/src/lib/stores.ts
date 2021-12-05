import {writable} from "svelte/store";
import Cookies from 'js-cookie';
import io from "socket.io-client"

export const route = writable<string>("index")
export const authenticated = writable(!!Cookies.get("token"))
export const socket = io()
export let players: {id: string, username: string}[] | undefined
export let host: string | undefined
export let me: {id: string, username: string} | undefined
export let iAmHost = () => host === me?.id

getMe()
route.subscribe(_ => { // Update authenticated on page change
	authenticated.set(!!Cookies.get("token"))
	getMe()
})

// Fancy back button code
route.subscribe(r => {
	window.history.pushState(r, "", "/")
})

window.addEventListener("popstate", (e) => {
	route.set(e.state)
})

// Set players and host when game starts
socket.on("startGame", data => {
	players = data.players
	host = data.host
	console.log("E")
})

// Get current user
async function getMe() {
	if (!!Cookies.get("token") && !me) {
		me = await fetch("/api/auth/me").then(res => res.json())
		console.log(me)
	}
}

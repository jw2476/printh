import {writable} from "svelte/store";
import Cookies from 'js-cookie';

export const route = writable("index")
export const authenticated = writable(false)
export const socket = writable()

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

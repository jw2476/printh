import {writable} from "svelte/store";
import Cookies from 'js-cookie';

export const route = writable("index")
export const authenticated = writable(false)

authenticated.set(!!Cookies.get("token"))
route.subscribe(_ => { // Update authenticated on page change
	authenticated.set(!!Cookies.get("token"))
})

import { writable } from 'svelte/store';
import { browser } from '$app/env';

export const token = writable<string>()

if (browser)
	token.set(localStorage.getItem("token"))
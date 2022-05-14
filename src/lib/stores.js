import { writable } from "svelte/store";

export const isLoggedIn = writable(false);
export const tasks = writable([]);
export const dbControl = writable(0);

export const bg = writable("");

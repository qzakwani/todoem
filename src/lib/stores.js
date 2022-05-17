import { writable } from "svelte/store";

export const isLoggedIn = writable(false);
export const tasks = writable([]);
export const completedTasks = writable([]);
export const dbControl = writable(true);

export const bg = writable("");

import { writable } from "svelte/store";

export const isLoggedIn = writable(false);
export const tasks = writable([]);
export const completedTasks = writable([]);
export const dbControl = writable(true);
export const showTodoError = writable(false);
export const hideCompletedTasks = writable(false);

export const bg = writable("");

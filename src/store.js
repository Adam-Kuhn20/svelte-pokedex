import { writable } from "svelte/store";

export const correctAnswers = writable(0);
export const tries = writable(0);
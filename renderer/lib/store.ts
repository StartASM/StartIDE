// src/stores.ts
import { writable } from 'svelte/store';

export const currentLineNumber = writable('');
export const errorTerminalToggled = writable(false);
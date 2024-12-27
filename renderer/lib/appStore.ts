// src/stores.ts
import { writable } from 'svelte/store';

//Editor Window Stores
export const editorOpen = writable(true);
export const currentLineNumber = writable('');

//Terminal Stores
export const terminalOpen = writable(false);
export const errorTerminalToggled = writable(false);
// src/stores.ts
import { writable } from 'svelte/store';

//Editor Window Stores
export const editorOpen = writable(false);
export const currentLineNumber = writable('');

//Terminal Stores
export const terminalOpen = writable(false);
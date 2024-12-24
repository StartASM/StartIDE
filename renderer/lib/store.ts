// src/stores.ts
import { writable } from 'svelte/store';

// Initialize with an empty string to indicate no line number at startup
export const currentLineNumber = writable('');

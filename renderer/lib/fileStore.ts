import { writable, derived } from 'svelte/store';

// Monaco Editor Content
export const editorContent = writable('');

// File Path
export const filePath = writable('');

// File name
export const fileName = derived(filePath, ($filePath) => {
    // Extract the file name from the path
    return $filePath ? $filePath.split('/').pop() || '' : 'Untitled';
});

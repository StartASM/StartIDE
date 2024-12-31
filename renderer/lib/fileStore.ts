import { writable, derived } from 'svelte/store';

// Monaco Editor Content
export const editorContent = writable('');

// File Path
export const filePath = writable('Open a file to get started');

// File name
export const fileName = derived(filePath, ($filePath) => {
    // Extract the file name from the path
    let extractedName = $filePath ? $filePath.split('/').pop() || '' : 'Open a File     ';
    return extractedName.slice(0, -5);
});
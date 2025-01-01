import { writable, derived } from 'svelte/store';

// Monaco Editor Content
export const editorContent = writable('StartIDE 0.0.1 \nOpen an existing file: Ctrl+O or Cmd+O \nCreate a new file: Ctrl+N or Cmd+N');

// File Path
export const filePath = writable('');

// File Name
export const fileName = derived(filePath, ($filePath) => {
    // Extract the file name from the path
    let extractedName = $filePath ? $filePath.split('/').pop() || '' : '';
    return extractedName.slice(0, -5); // Remove the .sasm extension
});

// Last Saved Content
export const lastSavedContent = writable('');

// Is File Modified
export const isFileModified = derived(
    [editorContent, lastSavedContent],
    ([$editorContent, $lastSavedContent]) => $editorContent !== $lastSavedContent
);

<script lang="ts">
    import * as monaco from 'monaco-editor';
    import { onMount } from 'svelte';
    import { registerStartASMLanguage } from '$lib/monaco-startasm';

    let editorContainer: HTMLDivElement;
    let message = "Hello Tailwind!";

    onMount(() => {
        // Register the StartASM language before creating the editor
        registerStartASMLanguage();

        // Define the custom theme for StartASM
        monaco.editor.defineTheme('startasm-theme', {
            base: 'vs-dark',
            inherit: true,
            rules: [
                { token: 'keyword.instruction', foreground: '569CD6', fontStyle: 'bold' }, // Blue
                { token: 'variable', foreground: '4EC9B0', fontStyle: 'bold' }, // Teal
                { token: 'number', foreground: '8BED8A', fontStyle: 'bold'}, // Light Green
                { token: 'number.hex', foreground: 'B5CEA8' }, // Yellow-green
                { token: 'character', foreground: 'FFFFFF', fontStyle: 'bold' }, // White for characters
                { token: 'string', foreground: 'CE9178' }, // Green
                { token: 'keyword.string', foreground: 'CE9178', fontStyle: 'italic' }, // Green italic
                { token: 'label', foreground: 'DCDCAA', fontStyle: 'bold' }, // Gold for labels
                { token: 'comment', foreground: '6A9955', fontStyle: 'italic' }, // Gray
                { token: 'literal.memory', foreground: 'FFD700', fontStyle: 'bold' }, // Yellow
                { token: 'literal.instruction', foreground: '00FFFF' }, // Cyan
                { token: 'keyword.conjunctionSrc', foreground: 'C586C0', fontStyle: 'bold' }, // Light purple
                { token: 'keyword.conjunctionDest', foreground: 'C586C0', fontStyle: 'bold' }, // Light purple
                { token: 'keyword.conjunctionOpr', foreground: 'FF6666', fontStyle: 'bold' }, // Light red
                { token: 'keyword.conjunctionCond', foreground: 'FFB469', fontStyle: 'bold' }, // Light Orange
                { token: 'keyword.conjunctionAttr', foreground: '9CDCFE', fontStyle: 'bold' }, // Light blue
                { token: 'keyword.stop', foreground: '850303', fontStyle: 'bold' }, // Maroon red

            ],
            colors: {},
        });

        // Set the custom theme
        monaco.editor.setTheme('startasm-theme');

        // Create the Monaco Editor instance
        const editor = monaco.editor.create(editorContainer, {
            value: ``, // Example StartASM code
            language: 'startasm',
            theme: 'startasm-theme', // Apply the custom theme

            // Custom line numbering to ignore empty lines
            lineNumbers: (lineNumber: number): string | number => {
                const lines = editor.getModel()?.getLinesContent();
                if (!lines) return lineNumber; // Fallback if the model is null

                let nonEmptyLineCounter = 1;

                for (let i = 0; i < lineNumber; i++) {
                    if (lines[i].trim() !== '') {
                        nonEmptyLineCounter++;
                    }
                }

                // Return empty string for empty lines; otherwise, return the computed number
                return lines[lineNumber - 1].trim() === '' ? '' : nonEmptyLineCounter - 1;
            },
        });

        return () => editor.dispose(); // Cleanup on destroy
    });
</script>

<style>
    .editor-container {
        width: 100%;
        height: 90vh;
    }
</style>

<div bind:this={editorContainer} class="editor-container bg-black text-white p-4 rounded shadow-lg mt-8"></div>
<div class="bg-blue-500 text-white p-4 rounded-lg shadow-lg">
    {message}
</div>



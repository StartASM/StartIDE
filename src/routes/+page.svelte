<script lang="ts">
    import * as monaco from 'monaco-editor';
    import { onMount } from 'svelte';
    import { registerStartASMLanguage } from '$lib/monaco-startasm';

    let editorContainer: HTMLDivElement;

    onMount(() => {
        // Register the StartASM language before creating the editor
        registerStartASMLanguage();

        // Create the Monaco Editor instance
        const editor = monaco.editor.create(editorContainer, {
            value: ``, // Example StartASM code
            language: 'startasm',
            theme: 'vs-dark',

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

<div bind:this={editorContainer} class="editor-container"></div>

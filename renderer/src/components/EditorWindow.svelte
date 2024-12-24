<script lang="ts">
    import * as monaco from 'monaco-editor';
    import { onMount, onDestroy } from 'svelte';
    import { registerStartASMLanguage } from '../../lib/monaco-startasm';

    export let initialValue = ''; // Initial content for the editor
    export let language = 'startasm'; // Programming language for syntax highlighting
    export let theme = 'startasm-theme'; // Monaco editor theme

    let editorContainer: HTMLDivElement;
    let editor;
    let nonEmptyLineCount = 0; // Track non-empty line count

    // Function to calculate non-empty line count
    function calculateNonEmptyLines(content: string): number {
        // Split the content into lines, trim whitespace, and filter out empty lines
        return content
            .split('\n')
            .filter(line => line.trim().length > 0) // Only count non-empty lines
            .length;
    }

    onMount(() => {
        // Register the StartASM language before creating the editor
        registerStartASMLanguage();

        // Define the custom theme for StartASM
        monaco.editor.defineTheme('startasm-theme', {
            base: 'vs-dark',
            inherit: true,
            rules: [
                { token: 'keyword.instruction', foreground: '569CD6', fontStyle: 'bold' },
                { token: 'variable', foreground: '4EC9B0', fontStyle: 'bold' },
                { token: 'number', foreground: '8BED8A', fontStyle: 'bold' },
                { token: 'number.hex', foreground: 'B5CEA8' },
                { token: 'character', foreground: 'FFFFFF', fontStyle: 'bold' },
                { token: 'string', foreground: 'CE9178' },
                { token: 'keyword.string', foreground: 'CE9178', fontStyle: 'italic' },
                { token: 'label', foreground: 'DCDCAA', fontStyle: 'bold' },
                { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
                { token: 'literal.memory', foreground: 'FFD700', fontStyle: 'bold' },
                { token: 'literal.instruction', foreground: '00FFFF' },
                { token: 'keyword.conjunctionSrc', foreground: 'C586C0', fontStyle: 'bold' },
                { token: 'keyword.conjunctionDest', foreground: 'C586C0', fontStyle: 'bold' },
                { token: 'keyword.conjunctionOpr', foreground: 'FF6666', fontStyle: 'bold' },
                { token: 'keyword.conjunctionCond', foreground: 'FFB469', fontStyle: 'bold' },
                { token: 'keyword.conjunctionAttr', foreground: '9CDCFE', fontStyle: 'bold' },
                { token: 'keyword.stop', foreground: '850303', fontStyle: 'bold' },
            ],
            colors: {},
        });

        // Set the custom theme
        monaco.editor.setTheme(theme);

        // Create the Monaco Editor instance
        editor = monaco.editor.create(editorContainer, {
            value: initialValue,
            language,
            theme,
            automaticLayout: true,
            lineNumbers: (lineNumber) => {
                const lines = editor.getValue().split('\n');
                const currentLine = lines[lineNumber - 1]; // Get the content of the current line
                // Check if the current line is empty or whitespace-only
                if (!currentLine || currentLine.trim().length === 0) {
                    return ''; // Return blank for empty lines
                }
                // Count non-empty lines up to the current line
                const trimmedLines = lines.slice(0, lineNumber).filter(line => line.trim().length > 0);
                return trimmedLines.length.toString(); // Return the correct non-empty line number
            },
        });
        // Update non-empty line count whenever the content changes
        editor.onDidChangeModelContent(() => {
            const content = editor.getValue();
            nonEmptyLineCount = calculateNonEmptyLines(content);
        });

        // Cleanup on destroy
        onDestroy(() => {
            editor.dispose();
        });
    });
</script>

<style>
    .editor-container {
        flex-grow: 1;
        overflow: hidden; /* Prevent content from bleeding out */
        position: relative;
    }
</style>

<div bind:this={editorContainer} class="editor-container flex-grow h-full overflow-auto"></div>


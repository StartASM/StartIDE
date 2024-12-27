<script lang="ts">
    import * as monaco from 'monaco-editor';
    import { onMount, onDestroy } from 'svelte';
    import { registerStartASMLanguage } from '../../../lib/monaco-startasm';
    import { currentLineNumber } from '../../../lib/appStore';

    export let initialValue = ''; // Initial content for the editor
    export let language = 'startasm'; // Programming language for syntax highlighting
    export let theme = 'startasm-theme'; // Monaco editor theme

    let editorContainer: HTMLDivElement;
    let editor;

    function calculateLogicalLineRange(selection: monaco.Selection): string {
        const lines = editor.getValue().split('\n'); // Split the content into lines
        const nonWhitespaceLines = lines
            .map((line, index) => ({ line, index: index + 1 })) // Add 1-based line numbers
            .filter(item => item.line.trim().length > 0); // Keep only non-whitespace lines
        //Create a mapping from literal line numbers to logical line numbers
        const literalToLogicalMap = new Map<number, number>();
        nonWhitespaceLines.forEach((item, logicalIndex) => {
            literalToLogicalMap.set(item.index, logicalIndex + 1); // Map literal to logical (1-based)
        });
        const startLine = selection.startLineNumber;
        const endLine = selection.endLineNumber;
        // Find the first and last valid lines in the selection
        const validStart = nonWhitespaceLines.find(item => item.index >= startLine);
        const validEnd = nonWhitespaceLines.findLast(item => item.index <= endLine);
        const startLogical = validStart ? literalToLogicalMap.get(validStart.index) : undefined;
        const endLogical = validEnd ? literalToLogicalMap.get(validEnd.index) : undefined;
        // If no valid lines are in the selection, return "Newline"
        if (!startLogical && !endLogical) {
            return 'Newline';
        }
        // If the start is undefined but the end is defined, it's an invalid range, return "Newline"
        if (startLogical === undefined && endLogical !== undefined) {
            return 'Newline';
        }
        // If the end logical line is greater than the start logical line, return "Newline"
        if (endLogical !== undefined && startLogical !== undefined && endLogical < startLogical) {
            return 'Newline';
        }
        // If there's only one valid logical line
        if (startLogical === endLogical) {
            return `Line ${startLogical}`;
        }
        // Return the range of logical lines
        return `Lines ${startLogical}-${endLogical}`;
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
            scrollBeyondLastLine: false, // Prevent scrolling beyond the last line
            minimap: {
                enabled: true, // Enable minimap
                renderCharacters: true, // Render characters in the minimap
                maxColumn: 100, // Set max width before minimap shows up
            },
        });
        editor.onDidChangeCursorSelection((event) => {
            const rangeInfo = calculateLogicalLineRange(event.selection); // Calculate logical line range
            currentLineNumber.set(rangeInfo); // Update the store with the computed range
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


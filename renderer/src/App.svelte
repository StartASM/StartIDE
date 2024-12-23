<script lang="ts">
  import * as monaco from 'monaco-editor';
  import { onMount, onDestroy } from 'svelte';
  import { registerStartASMLanguage } from '../lib/monaco-startasm';

  let editorContainer: HTMLDivElement;
  let terminalContent = "Terminal Output Here";
  let fileExplorer = ["main.sasm", "helper.sasm", "example.sasm"];
  let editor;

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
        { token: 'number', foreground: '8BED8A', fontStyle: 'bold' }, // Light Green
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
    editor = monaco.editor.create(editorContainer, {
      value: ``, // Example StartASM code
      language: 'startasm',
      theme: 'startasm-theme', // Apply the custom theme
      automaticLayout: true, // Allows Monaco to adjust layout automatically
      lineNumbers: "on",
    });

    // Handle window resize for Monaco
    const resizeObserver = new ResizeObserver(() => {
      editor.layout(); // Trigger Monaco to recalculate its dimensions
    });
    resizeObserver.observe(editorContainer);

    // Cleanup on destroy
    onDestroy(() => {
      editor.dispose();
      resizeObserver.disconnect();
    });
  });
</script>

<style>
  body {
    margin: 0;
    font-family: Arial, sans-serif;
    background-color: #1e1e1e;
    color: #ffffff;
  }

  .app-container {
    display: flex;
    height: 100vh;
  }

  .main-area {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  .editor-container {
    flex-grow: 1;
    background-color: black;
  }
</style>

<div class="app-container">
  <!-- Main Content Area -->
  <div class="main-area">
    <!-- Code Editor -->
    <div bind:this={editorContainer} class="editor-container"></div>
  </div>
</div>

<script lang="ts">
  import * as monaco from 'monaco-editor';
  import { onMount } from 'svelte';

  // Explicitly type editorContainer as an HTMLDivElement
  let editorContainer: HTMLDivElement;

  onMount(() => {
    const editor = monaco.editor.create(editorContainer, {
      value: "// Write your code here...",
      language: "javascript",
      theme: "vs-dark",
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

<script lang="ts">
  import { editorOpen, terminalOpen } from '../lib/store';

  import EditorWindow from './windows/EditorWindow.svelte';
  import TerminalWindow from './windows/TerminalWindow.svelte';
</script>

<div class="flex flex-col h-screen">
  {#if $editorOpen}
        <EditorWindow />
  {/if}

  {#if $terminalOpen && $editorOpen}
    <TerminalWindow />
  {/if}
</div>


<script lang="ts">
  import { editorOpen, terminalOpen } from '../lib/store';
  import { fly } from 'svelte/transition';

  import EditorWindow from './windows/EditorWindow.svelte';
  import TerminalWindow from './windows/TerminalWindow.svelte';
</script>

<div class="flex flex-col h-screen">
  {#if $editorOpen}
        <EditorWindow />
  {/if}

  {#if $terminalOpen && $editorOpen}
    <div transition:fly={{ y: 200, duration: 100 }}>
    <TerminalWindow />
    </div>
  {/if}
</div>

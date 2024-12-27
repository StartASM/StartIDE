<script lang="ts">
  import { editorOpen, consoleOpen } from '../lib/appStore';

  import EditorWindow from './windows/EditorWindow.svelte';
  import ConsoleWindow from './windows/ConsoleWindow.svelte';
</script>

<div class="flex flex-col h-screen">
  {#if $editorOpen}
        <EditorWindow />
  {/if}
  {#if $consoleOpen && $editorOpen}
    <ConsoleWindow />
  {/if}
</div>


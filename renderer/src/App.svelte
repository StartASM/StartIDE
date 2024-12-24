<script lang="ts">
  import EditorWindow from './windows/EditorWindow.svelte';
  import TerminalWindow from './windows/TerminalWindow.svelte';
</script>

<div class="flex flex-col h-screen">
  <EditorWindow />
  <TerminalWindow />
</div>

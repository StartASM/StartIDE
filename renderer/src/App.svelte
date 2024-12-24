<script lang="ts">
  import HeaderBar from './components/HeaderBar.svelte';
  import MonacoEditor from './components/EditorWindow.svelte';

  let terminalContent = 'Terminal Output Here';
  let fileExplorer = ['main.sasm', 'helper.sasm', 'example.sasm'];
</script>

<div class="flex flex-col h-screen">
  <div class="flex flex-col flex-grow p-4 border rounded-lg">
    <HeaderBar fileName="main.sasm" />
    <MonacoEditor initialValue="comment write your StartASM code here" />
  </div>
</div>

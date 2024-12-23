<script lang="ts">
  import HeaderBar from './components/HeaderBar.svelte';
  import MonacoEditor from './components/EditorWindow.svelte';

  let terminalContent = "Terminal Output Here";
  let fileExplorer = ["main.sasm", "helper.sasm", "example.sasm"];
</script>

<style>
  .app-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  .main-area {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow: hidden; /* Hide any overflowing content */
    padding: 1rem;
    border-radius: 0 0 8px 8px; /* Pass-through rounding */
  }

</style>

<div class="app-container">
  <!-- Main Content Area -->
  <div class="main-area">
    <HeaderBar fileName="main.sasm" />
    <MonacoEditor initialValue="comment write your StartASM code here" />
  </div>
</div>

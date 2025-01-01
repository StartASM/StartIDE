<script lang="ts">
    import HeaderBarEditor from '../components/editor/HeaderBarEditor.svelte';
    import FooterBarEditor from '../components/editor/FooterBarEditor.svelte';
    import MonacoEditor from '../components/editor/MonacoEditor.svelte';
</script>

<div class="flex flex-col flex-grow p-2 overflow-hidden">
    <HeaderBarEditor />
    <div class="flex-grow overflow-hidden">
        <MonacoEditor />
    </div>
    <FooterBarEditor />
</div>

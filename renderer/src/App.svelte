<script lang="ts">
    import { onMount } from "svelte";
    import { editorOpen, terminalOpen } from "../lib/appStore";
    import { editorContent, filePath } from "../lib/fileStore";
    import EditorWindow from "./windows/EditorWindow.svelte";
    import TerminalWindow from "./windows/TerminalWindow.svelte";

    onMount(() => {
        // Listen for the "menu-open-file" event
        window.bridge.onMenuEvent("menu-open-file", async () => {
            console.log("Menu Open File Event Received!");
            const fileData = await window.bridge.openFile();
            if (fileData) {
                editorContent.set(fileData.content); // Update the editor content
                filePath.set(fileData.path); // Update the file path
            }
            editorOpen.set(true);
        });

        // Listen for the "menu-save-file" event
        window.bridge.onMenuEvent("menu-save-file", async () => {
            console.log("Menu Save File Event Received!");
            const content = $editorContent; // Get the current editor content
            const path = $filePath; // Get the current file path
            await window.bridge.saveFile(content, path);
        });
    });
</script>

<div class="flex flex-col h-screen">
    <EditorWindow />
    {#if $terminalOpen && $editorOpen}
        <TerminalWindow />
    {/if}
</div>

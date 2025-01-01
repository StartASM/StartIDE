<script lang="ts">
    import { onMount } from "svelte";
    import { editorOpen, terminalOpen } from "../lib/appStore";
    import {editorContent, filePath, lastSavedContent} from "../lib/fileStore";
    import EditorWindow from "./windows/EditorWindow.svelte";
    import TerminalWindow from "./windows/TerminalWindow.svelte";

    onMount(() => {
        window.bridge.onMenuEvent("menu-open-file", async () => {
            const fileData = await window.bridge.openFile();
            if (fileData) {
                editorContent.set(fileData.content);
                lastSavedContent.set(fileData.content);
                filePath.set(fileData.path);
            }
            editorOpen.set(true);
        });

        window.bridge.onMenuEvent("menu-save-file", async () => {
            const content = $editorContent;
            const path = $filePath;
            const fileData = await window.bridge.saveFile(content, path);
            if (fileData) {
                lastSavedContent.set(fileData.content);
            }
        });

        window.bridge.onMenuEvent("menu-save-as-file", async () => {
            const content = $editorContent; // Current editor content
            const fileData = await window.bridge.saveAsFile(content);
            if (fileData) {
                filePath.set(fileData.path);
                lastSavedContent.set(fileData.content);
            }
        });

        window.bridge.onMenuEvent("menu-new-file", async () => {
            const newFileData = await window.bridge.newFile();
            if (newFileData) {
                editorContent.set(newFileData.content);
                filePath.set(newFileData.path);
                editorOpen.set(true);
                lastSavedContent.set(newFileData.content);
            }
        });

        window.bridge.onMenuEvent("menu-toggle-terminal", async () => {
            if ($editorOpen) {
                terminalOpen.update((current) => !current);
            }
        });

    });
</script>

<div class="flex flex-col h-screen">
    <EditorWindow />
    {#if $terminalOpen}
        <TerminalWindow />
    {/if}
</div>

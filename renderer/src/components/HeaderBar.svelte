<script lang="ts">
    export let fileName = "Untitled"; // Dynamic file name to display

    // Placeholder actions for the buttons
    const runFile = () => alert("Run file");
    const compileFile = () => alert("Compile/export file");
    const vmMenu = () => alert("Bring up VM menu");
    const fileMenu = () => alert("Bring up file menu");
    const closeFile = () => alert("Close file");
</script>

<style>
    .top-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.5rem 1rem;
        background-color: #2d2d2d;
        color: #ffffff;
        border-bottom: 1px solid #444;
        font-size: 1rem;
        gap: 0.5rem;
        overflow: hidden;
    }

    .file-name {
        font-weight: bold;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        flex-grow: 1;
        min-width: 0;
    }

    .actions {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .left-actions {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .right-actions {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .vertical-line {
        height: 24px;
        width: 1px;
        background-color: #ffffff;
        margin: 0 1rem;
    }

    .icon-button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        background: transparent;
        border: none;
        border-radius: 4px;
        color: #ffffff;
        cursor: pointer;
        transition: background-color 0.2s ease;
    }

    .icon-button:hover {
        background-color: #444;
    }

    .close-button {
        color: #ff6f61;
    }

    .close-button:hover {
        background-color: #660000;
    }
</style>

<div class="top-bar">
    <div class="file-name">{fileName}</div>

    <div class="actions">
        <!-- Left action group -->
        <div class="left-actions">
            <button class="icon-button" on:click={runFile} aria-label="Run">
                <i class="bi bi-play-fill"></i>
            </button>
            <button class="icon-button" on:click={compileFile} aria-label="Debug">
                <i class="bi bi-file-earmark-binary-fill"></i>
            </button>
        </div>

        <!-- Vertical line separator -->
        <div class="vertical-line"></div>

        <!-- Right action group -->
        <div class="right-actions">
            <button class="icon-button" on:click={vmMenu} aria-label="Compile">
                <i class="bi bi-motherboard-fill"></i>
            </button>
            <button class="icon-button" on:click={fileMenu} aria-label="Compile">
                <i class="bi bi-folder-fill"></i>
            </button>
            <button class="icon-button close-button" on:click={closeFile} aria-label="Close">
                <i class="bi bi-x-lg"></i>
            </button>
        </div>
    </div>
</div>

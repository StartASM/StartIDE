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
        background: rgba(45, 45, 45, 0.6); /* Semi-transparent background */
        backdrop-filter: blur(12px); /* Apply frosted glass blur effect */
        -webkit-backdrop-filter: blur(12px); /* Safari support */
        color: #ffffff;
        font-size: 1rem;
        overflow: hidden;
        border-radius: 8px 8px 0 0;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Subtle shadow for depth */
    }

    .file-name {
        font-weight: bold;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        flex-grow: 1;
        min-width: 0;
        position: relative;
    }

    .file-name::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg, #66b8ff, #ff6f61);
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
        background-color: rgba(255, 255, 255, 0.3); /* Transparent vertical line */
        margin: 0 1rem;
    }

    .icon-button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        background: rgba(255, 255, 255, 0.1); /* Semi-transparent button background */
        backdrop-filter: blur(10px); /* Frosted glass effect for buttons */
        -webkit-backdrop-filter: blur(10px); /* Safari support */
        border: 1px solid rgba(255, 255, 255, 0.2); /* Subtle border */
        border-radius: 6px;
        color: #ffffff;
        cursor: pointer;
        transition: background-color 0.3s ease, transform 0.3s ease, border-color 0.3s ease;
    }

    .icon-button:hover {
        background-color: rgba(255, 255, 255, 0.2); /* Slightly brighter hover */
        border-color: rgba(255, 255, 255, 0.4); /* Brighter border on hover */
        transform: scale(1.05); /* Subtle zoom */
    }

    .close-button {
        color: #ff6f61;
    }

    .close-button:hover {
        background-color: rgba(102, 0, 0, 0.4); /* Semi-transparent red hover */
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

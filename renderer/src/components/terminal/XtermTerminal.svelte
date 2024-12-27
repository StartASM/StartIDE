<script lang="ts">
    import { Terminal } from "xterm";
    import { FitAddon } from "xterm-addon-fit";
    import { onMount } from "svelte";
    import "xterm/css/xterm.css";

    let terminal: Terminal;
    let fitAddon: FitAddon;

    onMount(() => {
        fitAddon = new FitAddon();
        terminal = new Terminal({
            cursorBlink: true,
            theme: {
                background: "#1e1e1e",
                foreground: "#ffffff",
            },
        });

        terminal.loadAddon(fitAddon);

        const container = document.getElementById("terminal-container");
        if (container) {
            terminal.open(container);
            fitAddon.fit();

            // Handle user input
            terminal.onData((input) => {
                window.bridge.sendInput(input);
            });

            // Listen for output from the backend
            window.bridge.onOutput((data) => {
                terminal.write(data);
            });
        }
    });
</script>

<style>
    .terminal-container {
        display: flex;
        height: 100%;
        width: 100%;
        overflow: hidden;
        position: relative;
        background-color: #1e1e1e;
    }
</style>

<div id="terminal-container" class="terminal-container"></div>

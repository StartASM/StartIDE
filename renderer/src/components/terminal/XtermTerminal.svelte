<script lang="ts">
    import { Terminal } from 'xterm';
    import { FitAddon } from 'xterm-addon-fit';
    import { onMount } from 'svelte';
    import 'xterm/css/xterm.css';

    let terminal: Terminal;
    let fitAddon: FitAddon;
    let inputBuffer = ''; // Buffer to store user input

    onMount(() => {
        fitAddon = new FitAddon();
        terminal = new Terminal({
            cursorBlink: true,
            theme: {
                background: '#1e1e1e',
                foreground: '#ffffff',
            },
        });

        terminal.loadAddon(fitAddon);

        const container = document.getElementById('terminal-container');
        if (container) {
            terminal.open(container);
            fitAddon.fit(); // Resize terminal to fit container

            // Listen for terminal input
            terminal.onKey(({ key, domEvent }) => {
                if (domEvent.key === 'Enter') {
                    const command = inputBuffer.trim();
                    terminal.write('\r'); // Send newline
                    window.bridge.terminal.sendInput(command); // Send input to the backend
                    inputBuffer = ''; // Clear the input buffer
                } else if (domEvent.key === 'Backspace') {
                    if (inputBuffer.length > 0) {
                        inputBuffer = inputBuffer.slice(0, -1);
                        terminal.write('\b \b'); // Handle backspace visually
                    }
                } else {
                    inputBuffer += key;
                    terminal.write(key); // Display the typed key
                }
            });

            // Listen for backend responses
            window.bridge.terminal.onOutput((output: string) => {
                terminal.write(output); // Write backend output
            });

            // Resize terminal dynamically on window resize
            window.addEventListener('resize', () => {
                fitAddon.fit();
                const { cols, rows } = terminal;
                window.bridge.terminal.resize(cols, rows); // Notify backend of new size
            });

            // Notify backend of initial terminal size
            const { cols, rows } = terminal;
            window.bridge.terminal.resize(cols, rows);
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
        background-color: #1e1e1e; /* Consistent background color */
    }
</style>

<div id="terminal-container" class="terminal-container"></div>

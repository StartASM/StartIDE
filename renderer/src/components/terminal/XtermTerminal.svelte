<script lang="ts">
    import { Terminal } from 'xterm';
    import { FitAddon } from 'xterm-addon-fit';
    import { onMount } from 'svelte';
    import 'xterm/css/xterm.css';

    let terminal: Terminal;
    let fitAddon: FitAddon;
    let inputBuffer = ''; // Buffer to store user input
    let currentDirectory = ''; // Current working directory

    async function fetchCurrentDirectory() {
        currentDirectory = await window.bridge.getCurrentDirectory();
    }

    function appendPrompt() {
        terminal.write(`${currentDirectory} $ `); // Add a prompt with the current directory
    }

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

            fetchCurrentDirectory().then(() => {
                appendPrompt(); // Display the prompt
            });

            // Handle user input
            terminal.onKey(({ key, domEvent }) => {
                if (domEvent.key === 'Enter') {
                    const command = inputBuffer.trim();
                    terminal.writeln(''); // Move to a new line after input
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
                if (output === '') {
                    // If the output is an empty string, just append a new prompt without printing anything
                    appendPrompt();
                } else {
                    terminal.writeln(output); // Display the backend output
                    appendPrompt(); // Add the prompt
                }
            });

            // Resize terminal dynamically on window resize
            window.addEventListener('resize', () => {
                fitAddon.fit();
            });
        }
    });

    export function write(data: string) {
        terminal?.writeln(data);
    }

    export function clear() {
        terminal?.clear();
    }
</script>

<style>
    .terminal-container {
        overflow: hidden; /* Prevent content from bleeding out */
        position: relative;
    }
</style>

<div id="terminal-container" class="terminal-container w-full h-full rounded-b-lg"></div>

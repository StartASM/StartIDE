<script lang="ts">
    import { Terminal } from 'xterm';
    import { onMount } from 'svelte';
    import 'xterm/css/xterm.css';

    let terminal: Terminal;
    let inputBuffer = ''; // Buffer to store user input

    onMount(() => {
        // Initialize the terminal
        terminal = new Terminal({
            cursorBlink: true,
            theme: {
                background: '#1e1e1e',
                foreground: '#ffffff',
            },
        });

        const container = document.getElementById('terminal-container');
        if (container) {
            terminal.open(container);
            terminal.writeln('Welcome to the Ignition IDE Terminal!');

            // Handle user input
            terminal.onKey(({ key, domEvent }) => {
                if (domEvent.key === 'Enter') {
                    // Send command to the backend
                    window.bridge.terminal.sendInput(inputBuffer);
                    inputBuffer = ''; // Clear the buffer
                    terminal.writeln(''); // Move to the next line
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
                terminal.writeln(output); // Display backend output
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
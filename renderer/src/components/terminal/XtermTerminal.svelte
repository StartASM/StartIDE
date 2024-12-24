<script lang="ts">
    import { Terminal } from 'xterm';
    import { onMount } from 'svelte';
    import 'xterm/css/xterm.css';

    let terminal: Terminal;

    // Initialize the terminal when the component is mounted
    onMount(() => {
        terminal = new Terminal({
            cursorBlink: true,
            theme: {
                background: '#1e1e1e', // Match Tailwind dark mode
                foreground: '#ffffff',
            },
        });
        const container = document.getElementById('terminal-container');
        if (container) {
            terminal.open(container);
            terminal.writeln('Welcome to the Ignition IDE Terminal!');
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
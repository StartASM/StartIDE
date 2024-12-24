<script lang="ts">
    import {errorTerminalToggled, terminalOpen} from '../../../lib/store';

    const closeWindow = () => {
        terminalOpen.update(() => false);
    };

    const toggleError = () => {
        errorTerminalToggled.update((current) => !current);
    };

    // Get the current state for icon determination
    $: iconClass = $errorTerminalToggled ? 'bi bi-exclamation-triangle-fill' : 'bi bi-terminal-fill';
    $: title = $errorTerminalToggled ? 'Error Log' : 'Terminal';
</script>

<div class="flex items-center justify-between p-1 bg-gray-800 bg-opacity-60 backdrop-blur-lg rounded-t-lg shadow-md relative">
    <!-- Left section with hamburger menu -->
    <div class="flex items-center gap-1.5">
        <div class="gap-1"></div>
        <div class="text-white font-bold truncate text-sm flex-grow">{title}</div>
    </div>

    <div class="flex items-center gap-1">
        <!-- Middle button group with increased spacing -->
        <div class="flex items-center gap-1.5">
            <button
                    class="btn btn-xs btn-square bg-gray-800 bg-opacity-40 backdrop-blur-lg hover:scale-105 focus:outline focus:outline-white hover:outline hover:outline-white transition-transform"
                    on:click={toggleError}
                    aria-label="Toggle Terminal"
            >
                <i class={iconClass}></i>
            </button>
        </div>
        <div class="w-0.5 h-4 bg-gray-400 mx-1.5"></div>
        <div class="flex items-center gap-1">
            <button
                    class="btn btn-xs btn-square bg-gray-800 bg-opacity-40 backdrop-blur-lg text-red-600 hover:scale-105 focus:outline focus:outline-red-600 hover:outline hover:outline-red-600 transition-transform"
                    on:click={closeWindow}
                    aria-label="Close"
            >
                <i class="bi bi-x-lg"></i>
            </button>
        </div>
        <div class="gap-1"></div>
    </div>
</div>

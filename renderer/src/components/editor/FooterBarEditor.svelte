<script lang="ts">
    import { currentLineNumber } from '../../../lib/appStore';

    export let leftText: string = 'Files > src > main.sasm';
    export let rightText: string = 'StartASM Version 0.0.1';
    let lineNumber: string = ''; // Default to empty string

    // Subscribe to the currentLineNumber store
    $: currentLineNumber.subscribe((value) => {
        lineNumber = value || ''; // Ensure lineNumber is a string
    });
</script>

<div class="flex items-center justify-between p-0.5 bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-b-lg shadow-sm relative text-xs">
    <!-- Left text area -->
    <div class="text-white font-semibold truncate ml-1 drop-shadow-sm">
        {leftText}
    </div>

    <!-- Middle text area -->
    <div class="text-white font-semibold truncate mx-2 text-center drop-shadow-sm">
        {lineNumber}
    </div>

    <!-- Right text area -->
    <div class="text-white font-semibold truncate mr-1 text-right drop-shadow-sm">
        {rightText}
    </div>
</div>

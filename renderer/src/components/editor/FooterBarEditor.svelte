<script lang="ts">
    import { currentLineNumber } from '../../../lib/appStore';
    import { filePath } from "../../../lib/fileStore";

    export let startASMVer: string = 'StartASM Version 0.0.1';
    let lineNumber: string = ''; // Default to empty string
    let truncatedPath: string = '';

    // Subscribe to the currentLineNumber store
    $: currentLineNumber.subscribe((value) => {
        lineNumber = value || ''; // Ensure lineNumber is a string
    });

    // Subscribe to the filePath store and handle truncation
    $: filePath.subscribe((value) => {
        truncatedPath = truncatePath(value || '');
    });

    // Function to truncate long paths
    function truncatePath(path: string): string {
        const maxLength = 40;     // Maximum total length for display

        if (path.length <= maxLength) {
            return path; // No need to truncate
        }

        // Split the path into directories
        const parts = path.split('/');
        const firstDirs = parts.slice(0, 2).join('/'); // First 2 directories
        const lastDirs = parts.slice(-2).join('/');    // Last 2 directories

        // Construct the truncated path
        return `${firstDirs}/.../${lastDirs}`;
    }
</script>

<div class="relative flex items-center justify-between p-1 bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-b-lg shadow-sm text-xs">
    <!-- Left text area (truncated path name) -->
    <div class="text-white font-semibold truncate ml-1 max-w-[40%]">
        {truncatedPath}
    </div>

    <!-- Middle text area  (Line number) -->
    <div class="absolute left-1/2 transform -translate-x-1/2 text-white font-semibold text-center whitespace-nowrap">
        {lineNumber}
    </div>

    <!-- Right text area (version information) -->
    <div class="text-white font-semibold truncate mr-1 max-w-[30%] text-right">
        {startASMVer}
    </div>
</div>

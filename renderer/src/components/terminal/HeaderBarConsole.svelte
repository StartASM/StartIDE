<script lang="ts">
    import {terminalOpen} from '../../../lib/appStore';

    const closeWindow = () => {
        terminalOpen.update(() => false);
    };
</script>

<div class="flex items-center justify-between p-1 bg-gray-800 bg-opacity-60 backdrop-blur-lg rounded-t-lg shadow-md relative">
    <!-- Left section with hamburger menu -->
    <div class="flex items-center gap-1.5">
        <div class="gap-1"></div>
        <div class="text-white font-bold truncate text-sm flex-grow">Terminal</div>
    </div>

    <div class="flex items-center gap-1">
        <!-- Middle button group with increased spacing -->
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

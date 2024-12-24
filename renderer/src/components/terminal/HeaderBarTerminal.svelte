<script lang="ts">
    const closeWindow = () => alert('Close terminal');
</script>

<div class="flex items-center justify-between p-1 bg-gray-800 bg-opacity-60 backdrop-blur-lg rounded-t-lg shadow-md relative">
    <!-- Left section with hamburger menu -->
    <div class="flex items-center gap-1.5">
        <!-- Title -->
        <div class="gap-1"></div>
        <div class="text-white font-bold truncate text-sm flex-grow">Terminal</div>
    </div>

    <div class="flex items-center gap-1">
        <div class="flex items-center gap-1.5">
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

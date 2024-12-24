<script lang="ts">
    export let fileName = 'Untitled';

    const runFile = () => alert('Run file');
    const compileFile = () => alert('Compile/export file');
    const vmMenu = () => alert('Bring up VM menu');
    const fileMenu = () => alert('Bring up file menu');
    const closeFile = () => alert('Close file');
</script>

<div class="flex items-center justify-between p-2 bg-gray-800 bg-opacity-60 backdrop-blur-lg rounded-t-lg shadow-md relative">
    <!-- Left section with hamburger menu -->
    <div class="flex items-center gap-4">
        <!-- Hamburger menu -->
        <div class="relative ml-2">
            <div
                    class="text-white text-2xl cursor-pointer hover:scale-110 transition-transform"
                    aria-label="Menu"
            >
                <i class="bi bi-list"></i>
            </div>
        </div>

        <!-- Title -->
        <div class="text-white font-bold truncate flex-grow">{fileName}</div>
    </div>

    <div class="flex items-center gap-4">
        <!-- Left button group with increased spacing -->
        <div class="flex items-center gap-3">
            <button
                    class="btn btn-sm btn-circle hover:scale-105 focus:outline focus:outline-white hover:outline hover:outline-white transition-transform"
                    on:click={runFile}
                    aria-label="Run"
            >
                <i class="bi bi-play-fill"></i>
            </button>
            <button
                    class="btn btn-sm btn-circle hover:scale-105 focus:outline focus:outline-white hover:outline hover:outline-white transition-transform"
                    on:click={compileFile}
                    aria-label="Compile"
            >
                <i class="bi bi-file-earmark-binary-fill"></i>
            </button>
        </div>

        <!-- Increased separation from the vertical line -->
        <div class="w-1 h-6 bg-gray-400 mx-3"></div>

        <!-- Right button group with increased spacing -->
        <div class="flex items-center gap-3">
            <button
                    class="btn btn-sm btn-circle hover:scale-105 focus:outline focus:outline-white hover:outline hover:outline-white transition-transform"
                    on:click={vmMenu}
                    aria-label="VM Menu"
            >
                <i class="bi bi-motherboard-fill"></i>
            </button>
            <button
                    class="btn btn-sm btn-circle hover:scale-105 focus:outline focus:outline-white hover:outline hover:outline-white transition-transform"
                    on:click={fileMenu}
                    aria-label="File Menu"
            >
                <i class="bi bi-folder-fill"></i>
            </button>
            <button
                    class="btn btn-sm btn-circle text-red-600 hover:scale-105 focus:outline focus:outline-red-600 hover:outline hover:outline-red-600 transition-transform"
                    on:click={closeFile}
                    aria-label="Close"
            >
                <i class="bi bi-x-lg"></i>
            </button>
        </div>
    </div>
</div>

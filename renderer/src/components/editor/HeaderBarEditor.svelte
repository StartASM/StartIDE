<script lang="ts">
    export let fileName = 'Untitled';
    export let fileExtension = '.file';

    const runFile = () => alert('Run file');
    const compileFile = () => alert('Compile/export file');
    const terminalMenu = () => alert('Bring up Terminal Menu')
    const vmMenu = () => alert('Bring up VM screen');
    const fileMenu = () => alert('Bring up file menu');
    const settingsMenu = () => alert('Bring up Settings');
    const closeWindow = () => alert('Close file');
</script>

<div class="flex items-center justify-between p-2 bg-gray-800 bg-opacity-60 backdrop-blur-lg rounded-t-lg shadow-md relative">
    <!-- Left section with hamburger menu -->
    <div class="flex items-center gap-3">
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

    <div class="flex items-center gap-1">
        <!-- Left button group with increased spacing -->
        <div class="flex items-center gap-3">
            <button
                    class="btn btn-sm btn-square bg-gray-800 bg-opacity-40 backdrop-blur-lg text-green-600 hover:scale-105 focus:outline focus:outline-green-600 hover:outline hover:outline-green-600 transition-transform"
                    on:click={runFile}
                    aria-label="Run"
            >
                <i class="bi bi-play-fill"></i>
            </button>
            <button
                    class="btn btn-sm btn-square bg-gray-800 bg-opacity-40 backdrop-blur-lg text-blue-600 hover:scale-105 focus:outline focus:outline-blue-600 hover:outline hover:outline-blue-600 transition-transform"
                    on:click={compileFile}
                    aria-label="Compile"
            >
                <i class="bi bi-file-earmark-binary-fill"></i>
            </button>
        </div>

        <div class="w-0.5 h-6 bg-gray-400 mx-3"></div>

        <!-- Middle button group with increased spacing -->
        <div class="flex items-center gap-1">
            <div class="flex items-center gap-3">
                <button
                        class="btn btn-sm btn-square bg-gray-800 bg-opacity-40 backdrop-blur-lg hover:scale-105 focus:outline focus:outline-white hover:outline hover:outline-white transition-transform"
                        on:click={terminalMenu}
                        aria-label="Terminal Menu"
                >
                    <i class="bi bi-terminal-fill"></i>
                </button>
                <button
                        class="btn btn-sm btn-square bg-gray-800 bg-opacity-40 backdrop-blur-lg hover:scale-105 focus:outline focus:outline-white hover:outline hover:outline-white transition-transform"
                        on:click={vmMenu}
                        aria-label="VM Menu"
                >
                    <i class="bi bi-motherboard-fill"></i>
                </button>
                <button
                        class="btn btn-sm btn-square bg-gray-800 bg-opacity-40 backdrop-blur-lg hover:scale-105 focus:outline focus:outline-white hover:outline hover:outline-white transition-transform"
                        on:click={fileMenu}
                        aria-label="File Menu"
                >
                    <i class="bi bi-folder-fill"></i>
                </button>
            </div>
        </div>

        <div class="w-0.5 h-6 bg-gray-400 mx-3"></div>

        <div class="flex items-center gap-2">
            <button
                    class="btn btn-sm btn-square bg-gray-800 bg-opacity-40 backdrop-blur-lg text-red-600 hover:scale-105 focus:outline focus:outline-red-600 hover:outline hover:outline-red-600 transition-transform"
                    on:click={closeWindow}
                    aria-label="Close"
            >
                <i class="bi bi-x-lg"></i>
            </button>
        </div>
        <div class="gap-1"></div>
    </div>
</div>

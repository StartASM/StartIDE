<script lang="ts">
    export let leftText: string = 'Files > src > main.sasm';
    export let rightText: string = 'StartASM Version 0.0.1';
</script>

<div class="flex items-center justify-between p-0.5 bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-b-lg shadow-sm relative text-xs">
    <!-- Left text area -->
    <div class="text-white font-medium truncate ml-1 drop-shadow-sm">
        {leftText}
    </div>

    <!-- Right text area -->
    <div class="text-white font-semibold truncate mr-1 text-right drop-shadow-sm">
        {rightText}
    </div>
</div>


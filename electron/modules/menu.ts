import { Menu, BrowserWindow, MenuItemConstructorOptions, app } from "electron";

export function setupMenu(mainWindow: BrowserWindow) {
    const isMac = process.platform === "darwin";

    const commonMenuTemplate: MenuItemConstructorOptions[] = [
        {
            label: "File",
            submenu: [
                {
                    label: "Open...",
                    accelerator: isMac ? "Cmd+O" : "Ctrl+O", // Add shortcut for Open
                    click: () => {
                        mainWindow.webContents.send("menu-open-file");
                    },
                },
                {
                    label: "Save",
                    accelerator: isMac ? "Cmd+S" : "Ctrl+S", // Add shortcut for Save
                    click: () => {
                        mainWindow.webContents.send("menu-save-file");
                    },
                },
                {label: "Compile"}
            ],
        },
        {
            label: "Edit",
            submenu: [
                { role: "undo", accelerator: isMac ? "Cmd+Z" : "Ctrl+Z" },
                { role: "redo", accelerator: isMac ? "Shift+Cmd+Z" : "Ctrl+Y" },
                { type: "separator" },
                { role: "cut", accelerator: isMac ? "Cmd+X" : "Ctrl+X" },
                { role: "copy", accelerator: isMac ? "Cmd+C" : "Ctrl+C" },
                { role: "paste", accelerator: isMac ? "Cmd+V" : "Ctrl+V" },
                { type: "separator" },
                { role: "selectAll", accelerator: isMac ? "Cmd+A" : "Ctrl+A" },
            ],
        },
        {
            label: "View",
            submenu: [
                { role: "reload", accelerator: isMac ? "Cmd+R" : "Ctrl+R" },
                { role: "toggleDevTools", accelerator: isMac ? "Alt+Cmd+I" : "Ctrl+Shift+I" },
                { type: "separator" },
                { role: "resetZoom", accelerator: "CmdOrCtrl+0" },
                { role: "zoomIn", accelerator: "CmdOrCtrl+Plus" },
                { role: "zoomOut", accelerator: "CmdOrCtrl+-" },
                { type: "separator" },
                { role: "togglefullscreen", accelerator: isMac ? "Ctrl+Cmd+F" : "F11" },
            ],
        },
        {
            label: "Terminal",
            submenu: [
                { label: "Toggle Terminal" },
                { label: "Clear Terminal" },
                { type: "separator" },
                { label: "Invoke Compiler from CLI "},
                { label: "Invoke Runtime from CLI "}
            ]

        },
        {
            label: "Breakpoint",
            submenu: [
                { label: "Create Breakpoint" },
                { label: "Remove Breakpoint" },
            ]
        },
        {
            label: "Execute",
            submenu: [
                { label: "Run File" },
                { type: "separator" },
                { label: "Start Debugger" },
                { label: "Step Forward" },
                { label: "Execute Remaining" },
                { label: "Restart" },
            ]
        },
        {
            label: "VM",
            submenu: [
                { label: "Open VM View" },
                { type: "separator" },
                { label: "Dump to Terminal" },
                { label: "Dump Parameters" },
            ]
        },
        {
            label: "Window",
            role: "window",
            submenu: [
                { role: "minimize", accelerator: isMac ? "Cmd+M" : "Alt+Space" },
                { role: "zoom" },
            ],
        },
        {
            label: "Help",
            role: "help",
            submenu: [
                {
                    label: "Learn More",
                    click: async () => {
                        const { shell } = require("electron");
                        await shell.openExternal("https://electronjs.org");
                    },
                },
            ],
        },
    ];

    const macSpecificTemplate: MenuItemConstructorOptions[] = [
        {
            label: app.name,
            submenu: [
                { role: "about" },
                { type: "separator" },
                { role: "services" },
                { type: "separator" },
                { role: "hide" },
                { role: "hideOthers" },
                { role: "unhide" },
                { type: "separator" },
                { role: "quit" },
            ],
        },
    ];

    const menuTemplate = isMac
        ? [...macSpecificTemplate, ...commonMenuTemplate]
        : commonMenuTemplate;

    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);
}

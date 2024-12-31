import {Menu, BrowserWindow, MenuItemConstructorOptions, app} from "electron";

export function setupMenu(mainWindow: BrowserWindow) {
    const isMac = process.platform === "darwin";

    const commonMenuTemplate: MenuItemConstructorOptions[] = [
        {
            label: "File",
            submenu: [
                {
                    label: "New File"
                },
                {
                    label: "Open...",
                    accelerator: isMac ? "Cmd+O" : "Ctrl+O", // Add shortcut for Open
                    click: () => {
                        mainWindow.webContents.send("menu-open-file");
                    },
                },
                {
                    label: "Recent Files"
                },
                { type: "separator" },
                { label: "Close Window"},
                {
                    label: "Save",
                    accelerator: isMac ? "Cmd+S" : "Ctrl+S", // Add shortcut for Save
                    click: () => {
                        mainWindow.webContents.send("menu-save-file");
                    },
                },
                {
                    label: "Save As...",
                    accelerator: isMac ? "Cmd+Shift+S" : "Ctrl+Shift+S",
                },
                {label: "Compile"},
                { type: "separator" },
                { label: "Settings..."},
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
                { role: "toggleDevTools", accelerator: isMac ? "Alt+Cmd+I" : "Ctrl+Shift+I" },
                { type: "separator" },
                { role: "zoomIn", accelerator: "CmdOrCtrl+Plus" },
                { role: "zoomOut", accelerator: "CmdOrCtrl+-" },
                { type: "separator" },
                { role: "togglefullscreen", accelerator: isMac ? "Ctrl+Cmd+F" : "F11" },
            ],
        },
        {
            label: "Terminal",
            submenu: [
                { label: "Toggle Terminal", accelerator: isMac ? "Cmd+T" : "Ctrl+T", click: () => {
                        mainWindow.webContents.send("menu-toggle-terminal");
                    },},
                { label: "Clear Terminal" },
                { type: "separator" },
                { label: "Invoke Compiler from CLI "},
                { label: "Invoke Runtime from CLI "}
            ]

        },
        {
            label: "Breakpoint",
            submenu: [
                { label: "Create Breakpoint", accelerator: isMac ? "Cmd+B" : "Ctrl+B" },
                { label: "Remove Breakpoint", accelerator: isMac ? "Shift+Cmd+B" : "Shift+Ctrl+B"},
            ]
        },
        {
            label: "Run",
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
                    label: "StartIDE Help",
                    click: async () => {
                        const { shell } = require("electron");
                        await shell.openExternal("");
                    },
                },
                {
                    label: "StartASM Documentation",
                    click: async () => {
                        const {shell} = require("electron");
                        await shell.openExternal("");
                    },
                }
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

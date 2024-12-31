import { Menu, BrowserWindow, MenuItemConstructorOptions, app } from "electron";

export function setupMenu(mainWindow: BrowserWindow) {
    const isMac = process.platform === "darwin";

    const commonMenuTemplate: MenuItemConstructorOptions[] = [
        {
            label: "File",
            submenu: [
                {
                    label: "Open",
                    click: () => {
                        mainWindow.webContents.send("menu-open-file");
                    },
                },
                {
                    label: "Save",
                    click: () => {
                        mainWindow.webContents.send("menu-save-file");
                    },
                },
                { type: "separator" },
            ],
        },
        {
            label: "Edit",
            submenu: [
                { role: "undo" },
                { role: "redo" },
                { type: "separator" },
                { role: "cut" },
                { role: "copy" },
                { role: "paste" },
                { type: "separator" },
                { role: "selectAll" },
            ],
        },
        {
            label: "View",
            submenu: [
                { role: "reload" },
                { role: "toggleDevTools" },
                { type: "separator" },
                { role: "resetZoom" },
                { role: "zoomIn" },
                { role: "zoomOut" },
                { type: "separator" },
                { role: "togglefullscreen" },
            ],
        },
        {
            label: "Window",
            role: "window",
            submenu: [
                { role: "minimize" },
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

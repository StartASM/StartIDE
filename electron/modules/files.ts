import { ipcMain, dialog, BrowserWindow } from "electron";
import { readFileSync, writeFileSync } from "fs";
import { changeTerminalDirectory } from "./terminal"
import store from "../lib/appStore";

export function setupFileManager(mainWindow: BrowserWindow) {
    ipcMain.handle("dialog:openFile", async () => {
        const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
            properties: ["openFile"],
            filters: [
                { name: "StartASM Files", extensions: ["sasm"] }, // Restrict to .sasm files
                { name: "All Files", extensions: ["*"] }, // Optional: Allow all files as fallback
            ],
        });

        if (canceled || filePaths.length === 0) return null;

        const fileContent = readFileSync(filePaths[0], "utf-8");

        // Update the store with the file path
        store.filePath = filePaths[0];
        changeTerminalDirectory();
        return { content: fileContent, path: filePaths[0] };
    });

    ipcMain.handle("dialog:saveFile", async (event, { content, filePath }) => {
        if (!filePath) {
            const { filePath: savePath } = await dialog.showSaveDialog(mainWindow);
            if (!savePath) return false;
            filePath = savePath;
        }

        // Update the store with the file path
        store.filePath = filePath;

        writeFileSync(filePath, content, "utf-8");
        return true;
    });

    ipcMain.handle("getCurrentFilePath", () => {
        // Allow renderer processes to access the current file path
        return store.filePath;
    });
}

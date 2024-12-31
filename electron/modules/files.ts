import { ipcMain, dialog, BrowserWindow } from "electron";
import { readFileSync, writeFileSync } from "fs";

export function setupFileManager(mainWindow: BrowserWindow) {
    ipcMain.handle("dialog:openFile", async () => {
        const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
            properties: ["openFile"],
        });

        if (canceled || filePaths.length === 0) return null;

        const fileContent = readFileSync(filePaths[0], "utf-8");
        return { content: fileContent, path: filePaths[0] };
    });

    ipcMain.handle("dialog:saveFile", async (event, { content, filePath }) => {
        if (!filePath) {
            const { filePath: savePath } = await dialog.showSaveDialog(mainWindow);
            if (!savePath) return false;
            filePath = savePath;
        }
        writeFileSync(filePath, content, "utf-8");
        return true;
    });
}

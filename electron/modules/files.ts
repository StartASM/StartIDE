import { ipcMain, dialog, BrowserWindow } from "electron";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { changeTerminalDirectory } from "./terminal";
import store from "../lib/appStore";

export function setupFileManager(mainWindow: BrowserWindow) {
    ipcMain.handle("file:newFile", async () => {
        // Show a dialog to select a directory
        const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
            properties: ["openDirectory"],
        });

        if (canceled || filePaths.length === 0) {
            return null; // User canceled the operation
        }

        const directoryPath = filePaths[0]; // The chosen directory
        const newFileName = "untitled.sasm"; // Default name for the new file
        const newFilePath = join(directoryPath, newFileName);

        // Create the new file with default content
        const defaultContent = ""; // Default content for a new file
        writeFileSync(newFilePath, defaultContent, "utf-8");

        // Save the directory to the store
        store.filePath = newFilePath;
        changeTerminalDirectory();
        // Return the new file's details
        return { content: defaultContent, path: newFilePath };
    });

    ipcMain.handle("dialog:openFile", async () => {
        const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
            properties: ["openFile"],
            filters: [
                { name: "StartASM Files", extensions: ["sasm"] },
                { name: "All Files", extensions: ["*"] },
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

        store.filePath = filePath;

        writeFileSync(filePath, content, "utf-8");
        return true;
    });

    ipcMain.handle("dialog:saveAsFile", async (event, { content }) => {
        // Show Save As dialog
        const { filePath: savePath } = await dialog.showSaveDialog(mainWindow, {
            title: "Save As",
            filters: [
                { name: "StartASM Files", extensions: ["sasm"] },
                { name: "All Files", extensions: ["*"] },
            ],
        });

        if (!savePath) {
            return false; // User canceled the dialog
        }

        // Save the content to the chosen file
        writeFileSync(savePath, content, "utf-8");

        // Update the file path in the store
        store.filePath = savePath;

        return {path: savePath};
    });

    ipcMain.handle("getCurrentFilePath", () => {
        return store.filePath;
    });
}
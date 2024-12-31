import { ipcMain, BrowserWindow } from "electron";
import * as pty from "node-pty";
import store from "../lib/appStore";
import fs from "fs";

let ptyProcess: pty.IPty | null = null;

export function setupTerminal(mainWindow: BrowserWindow): void {
    if (ptyProcess) {
        return; // Prevent reinitialization
    }

    const shell = process.env.SHELL || (process.platform === "win32" ? "powershell.exe" : "bash");

    ptyProcess = pty.spawn(shell, [], {
        name: "xterm-color",
        cwd: process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE,
        env: {
            ...process.env,
        },
    });

    // Relay terminal input and output as before
    ipcMain.on("terminal-input", (event, input: string) => {
        ptyProcess?.write(input);
    });

    if (ptyProcess) {
        (ptyProcess as any).on("data", (data: string) => {
            mainWindow?.webContents.send("terminal-output", data);
        });
    }

    // Optionally clear the terminal
    setTimeout(() => {
        const clearCommand = process.platform === "win32" ? "cls\r" : "clear\n";
        ptyProcess?.write(clearCommand);
    }, 1000);
}

export function changeTerminalDirectory(): void {
    if (!ptyProcess) {
        console.error("No terminal process available");
        return;
    }

    const clearCommand = process.platform === "win32" ? "cls\r" : "clear\n";
    const newDirectory = store.filePath ? require("path").dirname(store.filePath) : null;

    if (newDirectory && fs.existsSync(newDirectory) && fs.lstatSync(newDirectory).isDirectory()) {
        // Send clear and cd commands to the terminal
        ptyProcess.write(`${clearCommand}`);
        ptyProcess.write(`cd "${newDirectory}"\r`);
    } else {
        console.error("Invalid or nonexistent directory:", newDirectory);
    }
}
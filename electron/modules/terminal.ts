import { ipcMain, BrowserWindow } from "electron";
import * as pty from "node-pty";

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
    }, 1500);
}
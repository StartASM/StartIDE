import { app, BrowserWindow, ipcMain } from "electron";
import electronReload from "electron-reload";
import { join } from "path";
import * as pty from "node-pty";

let mainWindow: BrowserWindow;

app.once("ready", main);
app.setName("StartIDE");

async function main() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 600,
    minHeight: 400,
    resizable: true,
    minimizable: true,
    maximizable: true,
    frame: true,
    webPreferences: {
      devTools: true || !app.isPackaged, // Enable devtools
      preload: join(__dirname, "preload.js"), // Preload script
    },
  });

  if (app.isPackaged) {
    mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
  } else {
    electronReload(join(__dirname), {
      forceHardReset: true,
      hardResetMethod: "quit",
      electron: app.getPath("exe"),
    });
    await mainWindow.loadURL(`http://localhost:5173/`);
  }

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });

  // Event handlers for window states
  mainWindow.on("resize", () => {
    const bounds = mainWindow.getBounds();
    const { width, height } = bounds;
    mainWindow.webContents.send("window-resize", { width, height });
  });

  mainWindow.on("maximize", () => {
    mainWindow.webContents.send("window-state", "maximized");
  });

  mainWindow.on("unmaximize", () => {
    mainWindow.webContents.send("window-state", "normal");
  });

  mainWindow.on("minimize", () => {
    mainWindow.webContents.send("window-state", "minimized");
  });

  // Window control events
  ipcMain.on("window-control", (event, action) => {
    switch (action) {
      case "close":
        mainWindow.close();
        break;
      case "minimize":
        mainWindow.minimize();
        break;
      case "maximize":
        mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize();
        break;
    }
  });

  setupPty();
}

function setupPty() {
  const shell = process.env.SHELL || (process.platform === "win32" ? "powershell.exe" : "bash");

  const ptyProcess = pty.spawn(shell, ["--login"], {
    name: "xterm-color",
    cwd: process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE, // Use the user's home directory
    env: {
      ...process.env, // Spread the current environment
    },
  });

  // Send terminal input from the renderer to the pty process
  ipcMain.on("terminal-input", (event, input: string) => {
    ptyProcess.write(input);
  });

  // Send pty process output to the renderer
  (ptyProcess as any).on("data", (data: string) => {
    mainWindow?.webContents.send("terminal-output", data);
  });
}
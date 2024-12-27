import { app, BrowserWindow, ipcMain } from "electron";
import electronReload from "electron-reload";
import { join } from "path";
import { homedir } from "os";
import * as pty from "node-pty";

let mainWindow: BrowserWindow;
let currentDirectory = homedir(); // Start in the user's home directory
let ptyProcess: pty.IPty; // Node-Pty instance

app.once("ready", main);
app.setName("StartIDE");

async function main() {
  console.log("Starting Electron app...");

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

  console.log("Main window created.");

  if (app.isPackaged) {
    console.log("Loading packaged app...");
    mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
  } else {
    console.log("Loading development server...");
    electronReload(join(__dirname), {
      forceHardReset: true,
      hardResetMethod: "quit",
      electron: app.getPath("exe"),
    });
    await mainWindow.loadURL(`http://localhost:5173/`);
  }

  mainWindow.once("ready-to-show", () => {
    console.log("Main window ready to show.");
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

  ipcMain.handle("get-version", (_, key: "electron" | "node") => {
    return String(process.versions[key]);
  });

  ipcMain.handle("get-current-directory", () => {
    return currentDirectory; // Return the current working directory
  });

  setupPty(); // Initialize the PTY process
}

function setupPty() {
  const shell = process.env.SHELL || (process.platform === "win32" ? "cmd.exe" : "/bin/bash");

  ptyProcess = pty.spawn(shell, [], {
    name: "xterm-256color",
    cols: 80,
    rows: 24,
    cwd: currentDirectory,
    env: {
      ...process.env,
      PATH: process.env.PATH, // Explicitly include PATH
    },
  });

  ptyProcess.onData((data) => {
    mainWindow?.webContents.send("terminal-output", data);
  });

  ptyProcess.onExit(({ exitCode, signal }) => {
    console.error("PTY process exited.", { exitCode, signal });
  });

  ipcMain.on("terminal-input", (_, input) => {
    ptyProcess.write(input + "\r");
  });

  ipcMain.on("resize-terminal", (_, { cols, rows }) => {
    ptyProcess.resize(cols, rows);
  });

  ipcMain.handle("get-current-directory", () => {
    return currentDirectory;
  });
}
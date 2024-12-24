import { app, BrowserWindow, ipcMain } from "electron";
import electronReload from "electron-reload";
import { join } from "path";
import { spawn } from 'child_process';

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

  mainWindow.once("ready-to-show", mainWindow.show);

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

  // Handle custom window control events
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

  ipcMain.on('terminal-input', (event, input) => {
    const shell = spawn('bash', [], { stdio: ['pipe', 'pipe', 'pipe'] });

    // Write input to the shell
    shell.stdin.write(input + '\n');
    shell.stdin.end();

    // Send output back to the renderer
    shell.stdout.on('data', (data) => {
      event.reply('terminal-output', data.toString());
    });

    shell.stderr.on('data', (data) => {
      event.reply('terminal-output', `Error: ${data.toString()}`);
    });
  });
}

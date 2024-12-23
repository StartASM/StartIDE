import { app, BrowserWindow, ipcMain } from "electron";
import electronReload from "electron-reload";
import { join } from "path";

let mainWindow: BrowserWindow;

app.once("ready", main);

async function main() {
  mainWindow = new BrowserWindow({
    width: 800, // Initial width
    height: 600, // Initial height
    resizable: true, // Enable resizing
    minimizable: true, // Allow minimizing
    maximizable: true, // Allow maximizing
    show: false, // Prevent the window from showing until it's ready
    webPreferences: {
      devTools: true || !app.isPackaged, // Enable devtools
      preload: join(__dirname, "preload.js"), // Preload script
    },
  });

  // Load the appropriate content (local or development server)
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

  // Show the window when it's ready
  mainWindow.once("ready-to-show", mainWindow.show);

  // Handle window resize event and send size to renderer
  mainWindow.on("resize", () => {
    const bounds = mainWindow.getBounds(); // Correctly access the bounds object
    const width = bounds.width;
    const height = bounds.height;

    mainWindow.webContents.send("window-resize", { width, height });
  });

  // Optional: Listen to maximize and minimize events
  mainWindow.on("maximize", () => {
    mainWindow.webContents.send("window-state", "maximized");
  });

  mainWindow.on("unmaximize", () => {
    mainWindow.webContents.send("window-state", "normal");
  });

  mainWindow.on("minimize", () => {
    mainWindow.webContents.send("window-state", "minimized");
  });

  // IPC handler to return Electron/Node.js versions
  ipcMain.handle("get-version", (_, key: "electron" | "node") => {
    return String(process.versions[key]);
  });
}

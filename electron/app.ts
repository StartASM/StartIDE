import { app, BrowserWindow, ipcMain } from "electron";
import electronReload from "electron-reload";
import { join } from "path";
import fs from "fs-extra"; // For file system operations
import { setupTerminal } from "./modules/terminal";
import { setupFileManager } from "./modules/files";
import { setupMenu } from "./modules/menu";
import { readFileSync } from "fs";

let mainWindow: BrowserWindow;
const stateFilePath = join(app.getPath("userData"), "appState.json");

interface AppState {
  filePath?: string;
}

let appState: AppState = {}; // This will hold your persistent state

app.once("ready", main);
app.setName("StartIDE");

async function main() {
  // Load the saved state
  appState = await loadAppState();

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
      devTools: true,
      preload: join(__dirname, "preload.js"),
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

  setupWindowEvents();
  setupTerminal(mainWindow);
  setupFileManager(mainWindow);
  setupMenu(mainWindow);

  // Save state when the app is quitting
  app.on("before-quit", async () => {
    await saveAppState(appState);
  });
}

function setupWindowEvents() {
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

  // Update appState when the filePath changes
  ipcMain.handle("update-state", (_, newState: Partial<AppState>) => {
    appState = { ...appState, ...newState }; // Merge new state into appState
  });
}

// Save app state to a JSON file
async function saveAppState(state: AppState) {
  try {
    await fs.writeJson(stateFilePath, state, { spaces: 2 });
    console.log("App state saved successfully.");
  } catch (error) {
    console.error("Failed to save app state:", error);
  }
}

// Load app state from a JSON file
async function loadAppState(): Promise<AppState> {
  try {
    const state = await fs.readJson(stateFilePath);
    console.log("App state loaded successfully.");
    return state;
  } catch (error) {
    console.warn("No saved app state found, starting fresh.");
    return {}; // Default state
  }
}

ipcMain.handle("initialize-state", async () => {
  if (appState.filePath) {
    try {
      // Read the file's content
      const fileContent = readFileSync(appState.filePath, "utf-8");
      return { content: fileContent, path: appState.filePath };
    } catch (error) {
      console.error("Error reading the last opened file:", error);
      return null; // File might have been deleted or inaccessible
    }
  }
  return null; // No previous file path
});
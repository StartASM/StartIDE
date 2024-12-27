import { app, BrowserWindow, ipcMain } from "electron";
import electronReload from "electron-reload";
import { join } from "path";
import { spawn } from "child_process";
import { homedir } from "os";

let mainWindow: BrowserWindow;
let currentDirectory = homedir(); // Start in the user's home directory

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

  ipcMain.handle("get-current-directory", () => {
    return currentDirectory; // Return the current working directory
  });

  ipcMain.on("terminal-input", (event, input) => {
    const [command, ...args] = input.trim().split(" ");
    if (!command) {
      // No command entered, just send back nothing
      event.reply("terminal-output", ""); // Ensure no hang, but send nothing
      return;
    }
    if (command === "cd") {
      // Handle `cd` command
      const newDir = args.join(" ") || homedir(); // Default to home directory
      try {
        process.chdir(newDir); // Change the working directory
        currentDirectory = process.cwd(); // Update current directory
        event.reply("terminal-output", ""); // Send empty string for successful `cd`
        event.reply("directory-changed", currentDirectory); // Notify frontend of directory change
      } catch (error) {
        event.reply("terminal-output", `Error: ${error.message}`);
      }
    } else {
      // Execute other commands
      const shell = spawn(command, args, {
        cwd: currentDirectory,
        shell: process.env.SHELL || "/bin/bash", // Use user's default shell or bash
        env: {
          ...process.env, // Inherit environment variables
          COLUMNS: `${Math.floor(mainWindow.getBounds().width / 8)}`, // Set terminal width
        },
      });

      let stdoutBuffer = '';
      let stderrBuffer = '';

      shell.stdout.on("data", (data) => {
        stdoutBuffer += data.toString();
      });

      shell.stderr.on("data", (data) => {
        stderrBuffer += data.toString();
      });

      shell.on("close", (code) => {
        if (stdoutBuffer) event.reply("terminal-output", sanitizeOutput(stdoutBuffer));
        if (stderrBuffer) event.reply("terminal-output", sanitizeOutput(stderrBuffer));
      });
    }
  });
}

// Sanitize terminal output by replacing unwanted characters
function sanitizeOutput(output: string): string {
  return output.replace(/\r/g, "").trimEnd(); // Keep \t for proper formatting
}

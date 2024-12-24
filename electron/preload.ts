import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("bridge", {
  platform: process.platform, // Expose the platform for conditional rendering

  // Window control
  controlWindow: (action: "close" | "minimize" | "maximize") =>
      ipcRenderer.send("window-control", action),

  // Window events
  onResize: (callback: (size: { width: number; height: number }) => void) => {
    ipcRenderer.on("window-resize", (_, size) => callback(size));
  },
  onWindowStateChange: (callback: (state: "maximized" | "minimized" | "normal") => void) => {
    ipcRenderer.on("window-state", (_, state) => callback(state));
  },

  // Terminal functionality
  terminal: {
    sendInput: (input: string) => ipcRenderer.send("terminal-input", input),
    onOutput: (callback: (output: string) => void) => {
      ipcRenderer.on("terminal-output", (_, output) => callback(output));
    },
  },
  getCurrentDirectory: () => ipcRenderer.invoke("get-current-directory"),
  onDirectoryChanged: (callback: (newDir: string) => void) => {
    ipcRenderer.on("directory-changed", (_, newDir) => callback(newDir)); // Listen for directory change
  }
});

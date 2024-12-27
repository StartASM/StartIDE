import { contextBridge, ipcRenderer } from "electron";

// Expose a bridge object to the renderer process
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

  // Terminal communication
  sendInput: (input: string) => ipcRenderer.send("terminal-input", input),
  onOutput: (callback: (data: string) => void) => {
    ipcRenderer.on("terminal-output", (_, data) => callback(data));
  },
});

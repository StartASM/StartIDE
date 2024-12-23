import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("bridge", {
  platform: process.platform, // Expose the platform for conditional rendering
  controlWindow: (action: "close" | "minimize" | "maximize") => ipcRenderer.send("window-control", action),
  onResize: (callback: (size: { width: number; height: number }) => void) => {
    ipcRenderer.on("window-resize", (_, size) => callback(size));
  },
  onWindowStateChange: (callback: (state: "maximized" | "minimized" | "normal") => void) => {
    ipcRenderer.on("window-state", (_, state) => callback(state));
  },
});

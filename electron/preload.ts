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

  // State management
  updateState: (newState: Partial<{ filePath?: string }>) => ipcRenderer.invoke("update-state", newState),
  initializeState: () => ipcRenderer.invoke("initialize-state"),

  // Terminal communication
  sendInput: (input: string) => ipcRenderer.send("terminal-input", input),
  onOutput: (callback: (data: string) => void) => {
    ipcRenderer.on("terminal-output", (_, data) => callback(data));
  },

  // File operations
  openFile: () => ipcRenderer.invoke("dialog:openFile"),
  saveFile: (content: string, filePath?: string) => ipcRenderer.invoke("dialog:saveFile", { content, filePath }),
  saveAsFile: (content: string) => ipcRenderer.invoke("dialog:saveAsFile", { content }),
  newFile: () => ipcRenderer.invoke("file:newFile"),

  // Menu communication
  onMenuEvent: (event: string, callback: (...args: any[]) => void) => {
    ipcRenderer.on(event, (_, ...args) => callback(...args));
  },
});

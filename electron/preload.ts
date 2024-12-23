import { contextBridge, ipcRenderer } from "electron";

export const CONTEXT_BRIDGE = {
  /**
   * Returns the version from process.versions of the supplied target.
   */
  getVersion: async (opt: "electron" | "node"): Promise<string> => {
    return await ipcRenderer.invoke("get-version", opt);
  },

  /**
   * Listen for window resize events and execute a callback with the new size.
   */
  onResize: (callback: (size: { width: number; height: number }) => void) => {
    ipcRenderer.on("window-resize", (_, size) => callback(size));
  },

  /**
   * Listen for window state changes (e.g., maximized, minimized, normal).
   */
  onWindowStateChange: (callback: (state: "maximized" | "minimized" | "normal") => void) => {
    ipcRenderer.on("window-state", (_, state) => callback(state));
  },
};

contextBridge.exposeInMainWorld("bridge", CONTEXT_BRIDGE);

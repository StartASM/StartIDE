export {};

declare global {
    interface Window {
        bridge: {
            sendInput: (input: string) => void;
            onOutput: (callback: (data: string) => void) => void;
            controlWindow: (action: "close" | "minimize" | "maximize") => void;
            onResize: (callback: (size: { width: number; height: number }) => void) => void;
            onWindowStateChange: (callback: (state: "maximized" | "minimized" | "normal") => void) => void;
        };
    }
}

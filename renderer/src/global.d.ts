export {};

declare global {
    interface Window {
        bridge: {
            // Define the methods exposed by preload.ts
            platform: string;
            controlWindow: (action: "close" | "minimize" | "maximize") => void;
            onResize: (callback: (size: { width: number; height: number }) => void) => void;
            onWindowStateChange: (callback: (state: "maximized" | "minimized" | "normal") => void) => void;
            sendInput: (input: string) => void;
            onOutput: (callback: (data: string) => void) => void;
            openFile: () => Promise<{ content: string; path: string }>;
            onMenuEvent: (event: string, callback: (...args: any[]) => void) => void;
        };
    }
}

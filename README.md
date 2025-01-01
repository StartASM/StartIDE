# StartIDE



## Overview
StartIDE is designed to be the home and main development environment of the StartASM language. Focused on simplicity and beginner friendliness, it provides all the tools needed to write StartASM code in one place. Built with Electron, Svelte and TypeScript.



## Usage
### Running the Release Version
To simply use the IDE (and all it's bundled tools), head over to the releases page and download the latest release for your machine [coming eventually!].



### Building and Running with Node
You can also clone this repository and run StartIDE in development mode with node. Follow instructions 1 through to 3 to ensure the app will build and run correctly.


1. **Node Installation**:
   First ensure you have node.js and npm installed on your machine. You can download and install node.js from the official website.
   Due to the dependency `node-pty` required for terminal functionality, this application only supports up to Node version `18.20.5`. To check your current Node versions, you can run the following command:
    ```bash
    node -v
    ```
    If your Node version is too recent, you will need to use `nvm` to change your version. Follow the installation instructions on the official repository, then run the following to switch your node version:
    ```bash
    nvm install 18.20.5
    nvm use 18.20.5
    ```


2. **Dependency Installation**:
   Run the following command in the root directory to install all dependencies listed in `package.json` for both `electron` and `renderer`
    ```bash
    npm install
    cd renderer
    npm install
    ```


3. **node-pty Rebuilding**:
   Before running, the dependency `node-pty` will need to be rebuilt against the installed Node ABI. To do so, simply run in the root directory:
    ```bash
    npx electron-rebuild
    ```


4. **Usage**
    You can start the project in either the development server (with Vite), or package it as a native application for your device
    To run the development server, run:
    ```bash
    npm run dev
    ```
    To package for your machine:
    ```bash
    npm run package
    ```



## License
This project is licensed under the MIT license. Feel free to fork or contribute to this project or use it in any manner you like.

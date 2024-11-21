# StartIDE

## Overview
StartIDE is the all-in-one editor and development environment for the StartASM language. It is designed to streamline the development process for StartASM programs, offering features like syntax highlighting, code navigation and an integrated development environment (IDE) tailored for the language.

This project leverages Svelte, TypeScript, and Tauri to provide a fast and cross-platform experience.

## Features
- Syntax highlighting for StartASM programs
- Cross-platform compatibility (macOS, Linux, Windows)
- Integration with the StartASM Compiler and Ignition

## Prerequisites
To build and run StartIDE, you'll need:

- **Node.js**: Install Node.js (version 16 or higher)
- **Rust**: Install Rust by following the instructions at Rust's website
- **Tauri prerequisites**:
  - On macOS: Ensure `Xcode` is installed with its command-line tools.
  - On Debian/Ubuntu: Install the necessary libraries:
    ```bash
    sudo apt update
    sudo apt install libwebkit2gtk-4.0-dev build-essential libssl-dev
    ```

## Installation
Follow these steps to get started:

1. **Clone the Repository**:
   ```bash
    git clone https://github.com/StartASM/StartIDE.git
    cd StartIDE
   ```

2. **Install Dependencies**:
   Run the following command to install the required Node.js packages:
   ```bash
   npm install
   ```

3. **Run the Development Server**:
   Start the development server and launch the Tauri app:
   ```bash
   npm run tauri dev
   ```

4. **Build the Production Version**:
   To create a production build, run:
   ```bash
   npm run tauri build
   ```
   The compiled app will be located in the `src-tauri/target` directory.

## Usage
- Start the IDE with the `tauri dev` command to test and develop StartASM programs.
- Save your StartASM code with the `.sasm` file extension.
- Use the integrated tools to compile and run your StartASM programs.

## Integration with StartASM Compiler and Ignition
StartIDE is designed to work with the StartASM compiler. Ensure a docker image of the compiler is correctly installed and accessible from the CLI to enable full functionality.
StartIDE is also designed to use Ignition. Ensure the `Ignition` module, and it's necessary requisites, are also on your machine.

## License
This project is licensed under the MIT license. Feel free to fork, contribute, and use it in any manner you like.

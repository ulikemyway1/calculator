
# Calculator

## Task
[Link to the task](https://docs.google.com/document/d/1zpXXeSae-BlcxPKgw3DhxZA92cspVailrPYoaXSYrW8)

## Deploy
https://ulikemyway-calc.netlify.app/

## How to Run the App
Fork or clone this repository. In the app directory, run the following commands:

```
npm install
```
to install the necessary dependencies.

```
npm run build
```
to build the app.

### For Development Purposes, Run the Following Commands:

```
npm prepare
```
to set up pre-commit and pre-push hooks.

```
npm run start
```
to run the app on the local development server.

### Useful Tools
You can run the following commands to:

- Check for formatting errors according to Prettier settings: ``npm run ci:format``
- Apply Prettier for code formatting: ``npm run format``
- Check your code with ESLint: ``npm run lint``
- Run autofix with ESLint: ``npm run lint:fix``

## Project Structure
The code for this project is organized into the following folders:

#### ``components`` 
This folder contains the main UI and logic parts of the app, including:
- **Button**: Represents a calculator button (e.g., "1" or "=").
- **CalculatorView**: Represents the calculator UI itself.
- **ColorPicker**: A component that allows customization of the colors of the calculator UI elements.
- **Computer**: Contains the main class `Computer`, which evaluates mathematical expressions and implements the RPN and shunting yard algorithms.
- **KeyListener**: Represents a component that allows interaction with the calculator using the keyboard.
- **SettingsBar**: A component that allows toggling pro mode (including parentheses) and theming.
- **Slider**: A UI component that allows toggling operations.

#### ``helpers`` 
Contains functions that simplify the creation of new DOM elements.

#### ``scss`` 
Contains global styles in .scss format.

## Main Features
- Utilizes RPN and the shunting yard algorithm.
- Pro mode (including parentheses).
- Supports light and dark themes.
- Allows color customization.
- Saves settings between sessions.

## User Guide

This simple calculator supports the following operations: ``+``, ``-``, ``*``, ``/``, and ``%``. In **pro** mode, parentheses can be used.

To apply sign inversion (e.g., turning 5 into -5) using the keyboard, use the ``Shift`` + ``-`` combination. To evaluate an expression from the keyboard, use the ``=`` key.

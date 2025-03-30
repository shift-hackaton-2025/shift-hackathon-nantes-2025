# NewsAge Chrome Extension

A simple Chrome extension that displays the title of the current web page in a dialog when triggered by a keyboard shortcut.

## Features

- Press Command+Shift+Z (Mac) or Ctrl+Shift+Z (Windows/Linux) to open a dialog
- Displays the title of the currently active tab
- Clicking OK sends the page information to a specified webhook
- First-time setup prompts for user email which is saved for future use
- Simple OK/Cancel dialog interface with feedback on submission status

## Installation

### Development Mode

1. Clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" by toggling the switch in the top right corner
4. Click "Load unpacked" and select the directory containing this extension
5. The extension should now be installed and ready to use

### Building for Distribution

To create a distributable package:

1. Make sure all files are in place
2. Replace the placeholder icons in the `/images` folder with your own icons
3. Zip the entire directory 
4. The zipped file can be distributed or uploaded to the Chrome Web Store

## Usage

1. Navigate to any web page
2. Press Command+Shift+Z (Mac) or Ctrl+Shift+Z (Windows/Linux)
3. A dialog will appear showing the title of the current page
4. On first use, you'll be prompted to enter your email address
5. Click "OK" to send the page information to the server or "Cancel" to close without sending
6. After clicking OK, a status message will show whether the submission was successful

## Files

- `manifest.json`: Extension configuration
- `background.js`: Background service worker that listens for keyboard shortcuts
- `content.js`: Script injected into web pages to display the dialog
- `popup.html`: Popup UI when clicking the extension icon
- `images/`: Directory containing extension icons
# Electron - Desktop Application
Electron is used to wrap the React frontend

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.

### `yarn prod:build-mac` or `npm run-script prod:build-mac`

Will build the electron app with electron-builder for mac (.dmg)

### `yarn prod:build-linux` or `npm run-script prod:build-linux`

Will build the electron app with electron-builder for linux

### `yarn prod:build-win` or `npm run-script prod:build-win`

Will build the electron app with electron-builder for windows (.exe)

### `yarn prod:build` or `npm run-script prod:build`

Will build the electron app with electron-builder for mac & linux & windows
## macOS Requirements

An extra files `entitlements.mac.plist` is included for getting the usermedia permission (e.g. audio, video)
# Electron - Desktop Application

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.

### `yarn prod:build-mac`

Will build the electron app with electron-builder for mac (.dmg)

### `yarn prod:build-linux`

Will build the electron app with electron-builder for linux

### `yarn prod:build-wind`

Will build the electron app with electron-builder for windows (.exe)

## macOS Requirements

An extra files `entitlements.mac.plist` is included for getting the usermedia permission (e.g. audio, video)

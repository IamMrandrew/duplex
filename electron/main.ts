import { app, BrowserWindow } from 'electron'
import path from 'path'

let win: BrowserWindow

const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: 'hiddenInset',
    icon: path.join(__dirname, '../assets/icon.ico'),
  })
  win.loadURL('https://duplexx.herokuapp.com')
  win.on('close', () => {
    win = null
  })
  win.removeMenu()
}

app.on('ready', createWindow)

import "reflect-metadata";

import { app, BrowserWindow, globalShortcut, Menu, nativeImage, Tray, screen, ipcMain } from 'electron';

import { register } from "./di/module"
import { container } from 'tsyringe';
import { ImageTranslateService } from './service/image_translate_service';

register()

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

class CaptureWindow {
  _win: BrowserWindow

  open = () => {
    this._win?.close()

    this._win = new BrowserWindow({
      ...screen.getPrimaryDisplay().workAreaSize,
      transparent: true,
      frame: false,
      alwaysOnTop: true,
      fullscreenable: false,
      simpleFullscreen: true,
      resizable: false,
      skipTaskbar: true,
    })

    this._win.loadFile("capture.html")
    this._win.show()
  }

  close = () => {
    this._win?.close()
    this._win = null
  }
}

app.dock.hide()

app.on('ready', () => {
  let win = new CaptureWindow();

  const trayIcon = nativeImage
    .createFromPath("assets/icons/tray.png")
    .resize({ height: 16, width: 16 })

  const tray = new Tray(trayIcon)

  tray.on("right-click", () => {
    tray.popUpContextMenu(Menu.buildFromTemplate([
      {
        label: 'Quit',
        click: () => app.quit()
      },
      testTranslate()
    ]));
  });

  globalShortcut.register('Escape', win.close);
  globalShortcut.register('Cmd+Shift+8', win.open)
  tray.on("click", win.open);
});

app.on('window-all-closed', (e: any) => {
  e.preventDefault();
});

ipcMain.handle('translate', async (_, url) => {
  const img = await (await fetch(url)).arrayBuffer()

  const result = await container
    .resolve(ImageTranslateService)
    .translate(new Uint8Array(img), "ru")

  return result
})


function testTranslate() {
  let mainWindow: BrowserWindow

  return {
    label: "Translate image",
    click: () => {
      mainWindow?.close()

      mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
        },
      });

      mainWindow.loadFile('translate-image.html');
    }
  }
}
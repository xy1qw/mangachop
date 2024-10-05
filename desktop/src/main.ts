import { app, BrowserWindow, globalShortcut, Menu, nativeImage, Tray, screen, session } from 'electron';
import path from 'path';

declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string;
declare const MAIN_WINDOW_VITE_NAME: string;

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
    tray.popUpContextMenu(Menu.buildFromTemplate([{
      label: 'Quit',
      click: () => app.quit()
    }]));
  });

  globalShortcut.register('Escape', win.close);
  globalShortcut.register('Cmd+Shift+8', win.open)
  tray.on("click", win.open);
});

app.on('window-all-closed', (e: any) => {
  e.preventDefault();
});

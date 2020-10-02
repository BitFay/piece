import {app, BrowserWindow, ipcMain} from "electron";

import {
  IsWindowsFullScreen,
  IsWindowsMax,
  SetWindowsClose,
  SetWindowsMin,
  ToggleWindowsFullScreen,
  ToggleWindowsMax
} from "../../channel/browserWindow";
import {disconnect, stopDiscover} from "./device";

export function initWindowIpcMain(browser: BrowserWindow) {
  const bounds = browser.getBounds();
  ipcMain.on(ToggleWindowsMax, () => {
    if (browser.isFullScreen()) {
      browser.setFullScreen(false);
      browser.setBounds(bounds, true);
    } else if (browser.isMaximized()) {
      browser.setBounds(bounds, true);
    } else {
      browser.maximize();
    }
  });

  ipcMain.on(ToggleWindowsFullScreen, () => {
    browser.setFullScreen(!browser.isFullScreen());
  });

  ipcMain.on(SetWindowsMin, () => {
    browser.minimize();
  });

  ipcMain.on(SetWindowsClose, () => {
    if (browser.isFullScreen()) {
      browser.setFullScreen(false);
      browser.setBounds(bounds, true);
    } else {
      browser.hide();
    }
    disconnect();
    stopDiscover();
    app.exit();
  });

  ipcMain.on(IsWindowsFullScreen, (e: any) => {
    e.returnValue = browser.isFullScreen();
  });

  ipcMain.on(IsWindowsMax, (e: any) => {
    e.returnValue = browser.isMaximized();
  });
}

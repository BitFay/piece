/**
 * Create by fay on 2019-09-25 16:38
 */
import { app, BrowserWindow, shell, WebContents, Event } from 'electron';
import env from './env';
import {initMenu} from './menu';
import * as os from "os";
import { disconnect, stopDiscover } from './ipcMain/device';
import { initWindowIpcMain } from './ipcMain/browserWindow';
// tslint:disable-next-line:ban-ts-ignore
// @ts-ignore
import {build, version} from '../../package/pro/package.json';
import {createReadyBrowserWindow} from './ready';
import {createOrProvideStorage} from "./storage";
const versionStorage = createOrProvideStorage('version');

app.on('web-contents-created', (_event: Event, contents: WebContents) => {
  contents.on('new-window', async (event: Event, navigationUrl) => {
    event.preventDefault();
    await shell.openExternal(navigationUrl)
  })
});

app.on('window-all-closed', () => {
  disconnect();
  stopDiscover();
  app.quit();
});

export let win: BrowserWindow | null;
export let readyWin: BrowserWindow | null;

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', () => {
    // 当运行第二个实例时,将会聚焦到myWindow这个窗口
    if (win) {
      if (win.isMinimized()) win.restore();
      win.focus()
    }
  });

  app.on('ready', () => {
    require('./ipcMain/init');
    readyWin = createReadyBrowserWindow();
    win = new BrowserWindow({
      show: false,
      width: 1024,
      height: 704,
      minWidth: 1024,
      minHeight: 704,
      frame: false,
      // fullscreenable: false,
      title: 'keystore',
      webPreferences: {
        // devTools: process.env.NODE_ENV === 'development',
        nodeIntegration: true,
        webSecurity: true,
      },
      // titleBarStyle: os.type() === 'Darwin' ? 'customButtonsOnHover':'default', // hiddenInset
      // backgroundColor: '#0060FF'
      resizable: true
    });
    const buildNumber = build.artifactName.split('.')[1];
    switch (os.type()) {
      case 'Darwin':
        app.setAboutPanelOptions({
          applicationName: build.productName,
          applicationVersion: version,
          version: buildNumber,
        });
        break;
      case 'Windows_NT':
        app.setAppUserModelId('tech.keystore.neltharion');
        break;
      case 'Linux':
        break;
      default:
        break;
    }
    win.loadURL(env[process.env.NODE_ENV || 'development'].url);
    const buildVersion = version+'.'+buildNumber;
    if(versionStorage.get('version') !== buildVersion){
      const ses = win.webContents.session
      ses.clearStorageData({origin: 'https://enterprise.keystore.dev/',storages: ['serviceworkers']});
      win.loadURL(env[process.env.NODE_ENV || 'development'].url);
      versionStorage.set('version', version+'.'+buildNumber);
    }
    initWindowIpcMain(win);
    win.once('ready-to-show', () => {
      console.log('ready-to-show');
      // readyWin.close();
      // win.show();
      // win.focus();
    })
    win.webContents.on('did-finish-load', () => {
      console.log('did-finish-load');
    });

    // win.onbeforeunload = (e) => {
    //     //   console.log('I do not want to be closed')
    //     //
    //     //   // 与通常的浏览器不同,会提示给用户一个消息框,
    //     //   //返回非空值将默认取消关闭
    //     //   //建议使用对话框 API 让用户确认关闭应用程序.
    //     //   e.returnValue = false // 相当于 `return false` ，但是不推荐使用
    //     // }

    win.on('close', () => {
      disconnect();
      stopDiscover();
    });

    win.on('closed', () => {
      disconnect();
      stopDiscover();
      win = null;
    });

    initMenu();
  });
}

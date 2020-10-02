/**
 * Create by fay on 2019-09-25 16:38
 */
import { BrowserWindow } from 'electron';

export const createReadyBrowserWindow = () => {
  const readyWin = new BrowserWindow({
    width: 400,
    height: 88,
    minWidth: 400,
    minHeight: 88,
    frame: false,
    // hasShadow: false,
    // fullscreenable: false,
    title: 'keystore',
    webPreferences: {
      // devTools: process.env.NODE_ENV === 'development',
      nodeIntegration: true,
      webSecurity: true,
    },
    // titleBarStyle: os.type() === 'Darwin' ? 'customButtonsOnHover':'default', // hiddenInset
    // backgroundColor: '#0060FF',
    resizable: false,
    transparent: true,
  });

  // readyWin.loadFile(`./assets/ready.html`);
  readyWin.loadFile(`./assets/loading/loading.html`);
  // readyWin.loadURL(`http://localhost:8000/assets/loading/loading.html`);

  // readyWin.loadURL(`https://enterprise.keystore.dev/keystore/assets/images/coding.gif`);
  // const ses = readyWin.webContents.session
  // console.log(ses.getUserAgent());
  // ses.clearStorageData({storages: ['serviceworkers', 'cachestorage']});
  return readyWin;
}
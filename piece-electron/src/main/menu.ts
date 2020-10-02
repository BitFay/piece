import { app, BrowserWindow, Menu, MenuItem } from 'electron';
// tslint:disable-next-line:ban-ts-ignore
// @ts-ignore
import {build, version} from '../../package/pro/package.json';

const buildNumber = build.artifactName.split('.')[1];

const template: any = [
  {
    label: 'Application',
    submenu: [
      { label: 'About Keystore', selector: 'orderFrontStandardAboutPanel:' },
      { type: 'separator' },
      { label: `${build.productName} - ${version}.${buildNumber}` },
      { type: 'separator' },
      { label: 'Quit', accelerator: 'Command+Q', click() { app.quit(); }},
    ],
  },
  {
    label: 'Edit',
    submenu: [
      { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
      { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
      { type: 'separator' },
      { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
      { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
      { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
      { label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:' },
    ],
  },
  {
    label: '',
    submenu: [
      {
        label: '',
        accelerator: 'Shift+CmdOrCtrl+I',
        click(_menuItem: MenuItem, browserWindow: BrowserWindow) {
          browserWindow.webContents.openDevTools({
            mode: 'undocked',
          });
        },
      },
    ],
  },
];

export const initMenu = () => Menu.setApplicationMenu(Menu.buildFromTemplate(template));

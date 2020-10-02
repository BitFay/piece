import { ipcRenderer, remote } from './electron';
const { Menu, MenuItem } = remote;
let contextmenuEventCallback: any;

import {
  IsWindowsFullScreen,
  IsWindowsMax,
  SetWindowsClose,
  SetWindowsMin,
  ToggleWindowsFullScreen,
  ToggleWindowsMax,
} from '../channel/browserWindow';

const zhCNMenu = {
  cut: '剪切',
  copy: '复制',
  paste: '粘贴',
  selectAll: '全选',
}

const enUSMenu = {
  cut: 'Cut',
  copy: 'Copy',
  paste: 'Paste',
  selectAll: 'Select All',
}

const menuData: any = {
  'zh_CN': zhCNMenu,
  'en_US': enUSMenu,
}

export default {
  toggleWindowsMax: () => {
    ipcRenderer.send(ToggleWindowsMax);
  },

  setWindowsMin: () => {
    ipcRenderer.send(SetWindowsMin);
  },

  setWindowsClose: () => {
    ipcRenderer.send(SetWindowsClose);
  },

  toggleFullscreen: () => {
    ipcRenderer.send(ToggleWindowsFullScreen);
  },

  isFullScreen: () => {
    return ipcRenderer.sendSync(IsWindowsFullScreen);
  },

  isWindowsMax: () => {
    return ipcRenderer.sendSync(IsWindowsMax);
  },

  initContextMenu: (lang='en_US') => {
    contextmenuEventCallback && window.removeEventListener('contextmenu', contextmenuEventCallback);
    const menu = new Menu();
    menu.append(new MenuItem({ label: menuData[lang].copy, role: 'copy' }))
    menu.append(new MenuItem({ label: menuData[lang].paste, role: 'paste' }))
    menu.append(new MenuItem({ type: 'separator' }))
    menu.append(new MenuItem({ label: menuData[lang].selectAll, role: 'selectall' }))
    contextmenuEventCallback = (e: any) => {
      e.preventDefault()
      menu.popup({ window: remote.getCurrentWindow() })
    };
    window.addEventListener('contextmenu', contextmenuEventCallback, false)
  }
}


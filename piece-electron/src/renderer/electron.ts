import uuid from 'uuid/v4';

const initElectron = new Function("if(!window.Electron) window.Electron = require('electron')");

declare global {
  interface Window {
    Electron: {
      ipcRenderer: {
        invoke: (channel: string, ...args: any[]) => Promise<any>,
        send: (channel: string, ...args: any[]) => void,
        on: (channel: string, listener: Function) => void,
        once: (channel: string, listener: Function) => void,
        sendSync: any,
        removeListener: any
        removeAllListeners: any
      },
      remote: any
      shell: any
    };
  }
}
initElectron();
const ipcRenderer = window.Electron.ipcRenderer;
const shell = window.Electron.shell;
const remote = window.Electron.remote;

export function getEventReplyName(typeName: string) {
  return `${typeName}Reply-${uuid()}`;
}

export {ipcRenderer, shell, remote};


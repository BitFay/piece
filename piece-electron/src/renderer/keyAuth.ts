import { ipcRenderer } from './electron';
import * as channels from '../channel/keyAuth';
import {getEventReplyName} from '../Event';

export default {

  addResetListening: (callback?: Function) => {
    ipcRenderer.on(getEventReplyName(channels.RESET), (_event: any) => {
      callback && callback();
    });
    ipcRenderer.send(channels.RESET);
  },

  addBackupKeyAuthListening: (callback: Function) => {
    ipcRenderer.on(getEventReplyName(channels.ADD_BACKUP_KEY_AUTH_LISTENING), (_event: any, arg: any) => {
      callback && callback(JSON.parse(arg));
    });
    ipcRenderer.send(channels.ADD_BACKUP_KEY_AUTH_LISTENING);
  },
};
import { ipcRenderer } from './electron';
import {getEventReplyName} from "../Event";

export default {

  addListener: (channel: string, callback: Function) => {
    ipcRenderer.on(getEventReplyName(channel), (_event: any, arg: any) => {
      callback && callback(JSON.parse(arg));
    });
  },

  send: (channel: string, data?: any[]) => {
    ipcRenderer.send(channel, data);
  },

  removeAllListener: (channel: string) => {
    ipcRenderer.removeAllListeners(channel);
  }
}
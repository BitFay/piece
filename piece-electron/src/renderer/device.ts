import { ipcRenderer } from './electron';
import * as channels from '../channel/device';
import {getEventReplyName} from '../Event';

export default {
  startDiscovering: () => {
    ipcRenderer.send(channels.StartDiscovering);
  },

  stopDiscovering: () => {
    ipcRenderer.send(channels.StopDiscovering);
  },

  connect: (serialNumber: string) => {
    ipcRenderer.send(channels.Connect, serialNumber);
  },

  reconnect: () => {
    ipcRenderer.send(channels.RECONNECT);
  },

  disconnect: (callback?: Function) => {
    ipcRenderer.once(getEventReplyName(channels.DISCONNECT), (_event: any, arg: any) => {
      callback && callback(JSON.parse(arg));
    });
    ipcRenderer.send(channels.DISCONNECT);
  },

  addConnectListening: (callback?: Function) => {
    ipcRenderer.on(getEventReplyName(channels.ADD_CONNECT_LISTENING), (_event: any, arg: any) => {
      callback && callback(JSON.parse(arg));
    });
    ipcRenderer.send(channels.ADD_CONNECT_LISTENING);
  },

  addDisconnectListening: (callback?: Function) => {
    ipcRenderer.on(getEventReplyName(channels.ADD_DISCONNECT_LISTENING), (_event: any, arg: any) => {
      callback && callback(JSON.parse(arg));
    });
    ipcRenderer.send(channels.ADD_DISCONNECT_LISTENING);
  },

  removeConnectListening: (callback?: Function) => {
    ipcRenderer.on(getEventReplyName(channels.REMOVE_CONNECT_LISTENING), (_event: any, arg: any) => {
      callback && callback(JSON.parse(arg));
    });
    ipcRenderer.send(channels.REMOVE_CONNECT_LISTENING);
  },

  removeDisconnectListening: (callback?: Function) => {
    ipcRenderer.on(getEventReplyName(channels.REMOVE_DISCONNECT_LISTENING), (_event: any, arg: any) => {
      callback && callback(JSON.parse(arg));
    });
    ipcRenderer.send(channels.REMOVE_DISCONNECT_LISTENING);
  },

  getSnByConnecting: (callback: Function) => {
    ipcRenderer.once(getEventReplyName(channels.GET_SN_BY_CONNECTING), (_event: any, arg: any) => {
      callback(JSON.parse(arg));
    });
    ipcRenderer.send(channels.GET_SN_BY_CONNECTING);
  },

  discover: (callback: Function) => {
    ipcRenderer.on(getEventReplyName(channels.DISCOVER), (event: any, arg: any) => {
      callback(event, arg);
    })
  },

  parseBackupData: (o: any[], _callback?: Function) => {
    ipcRenderer.send(channels.PARSE_BACKUP_DATA, o);
  },

  done: (callback?: Function) => {
    ipcRenderer.once(getEventReplyName(channels.DONE), (_event: any, arg: any) => {
      callback && callback(JSON.parse(arg));
    });
    ipcRenderer.send(channels.DONE);
  },

  backupStatus: (o: any[],callback?: Function) => {
    ipcRenderer.once(getEventReplyName(channels.BACKUP_KEYAUTH_STATUS), (_event: any, arg: any) => {
      callback && callback(JSON.parse(arg));
    });
    ipcRenderer.send(channels.BACKUP_KEYAUTH_STATUS, o);
  },

  importBackupStatus: (o: any[]) => {
    ipcRenderer.send(channels.IMPORT_BACKUP_STATUS, o);
  },

  postIsRegistered: (o: any[]) => {
    ipcRenderer.send(channels.POST_IS_REGISTERED, o);
  },

  updater: (o: any[]) => {
    console.info('ipcRenderer updater');
    return ipcRenderer.invoke(channels.UPDATER, o);
  },

  reboot: (o: any[]) => {
    console.info('ipcRenderer reboot');
    return ipcRenderer.invoke(channels.REBOOT, o);
  },

  setting: (o: any[]) => {
    console.info('ipcRenderer setting');
    return ipcRenderer.invoke(channels.SETTING, o);
  },
};
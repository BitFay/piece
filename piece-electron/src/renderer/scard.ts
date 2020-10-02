import { ipcRenderer } from './electron';
import {getEventReplyName} from "../Event";
import {
  START_LISTENING,
  CONNECT,
  DISCONNECT,
  GET_ID,
  GET_PUBLIC_KEY,
  GET_BACKUP_STATUS,
  BACKUP_KEY_PIECE, MODIFY_PIN_CODE, VERIFY_PIN_CODE, RESTORE_KEY_PIECE, RESET, RESET_BACKUP_INFO
} from "../channel/scard";

export default {

  startListening: (callback: Function) => {
    ipcRenderer.on(getEventReplyName(START_LISTENING), (_event: any, arg: any) => {
      console.log('START_LISTENING render listening',getEventReplyName(START_LISTENING), arg)
      callback && callback(JSON.parse(arg));
    });
    ipcRenderer.send(START_LISTENING);
  },

  connect: (callback: Function) => {
    ipcRenderer.once(getEventReplyName(CONNECT), (_event: any, arg: any) => {
      callback && callback(JSON.parse(arg));
    });
    ipcRenderer.send(CONNECT);
  },

  disconnect: (callback: Function) => {
    ipcRenderer.once(getEventReplyName(DISCONNECT), (_event: any, arg: any) => {
      callback && callback(JSON.parse(arg));
    });
    ipcRenderer.send(DISCONNECT);
  },

  getId: (callback: Function) => {
    ipcRenderer.once(getEventReplyName(GET_ID), (_event: any, arg: any) => {
      callback && callback(JSON.parse(arg));
    });
    ipcRenderer.send(GET_ID);
  },

  getPublicKey: (callback: Function) => {
    ipcRenderer.once(getEventReplyName(GET_PUBLIC_KEY), (_event: any, arg: any) => {
      callback && callback(JSON.parse(arg));
    });
    ipcRenderer.send(GET_PUBLIC_KEY);
  },

  getBackupStatus: (callback: Function) => {
    ipcRenderer.once(getEventReplyName(GET_BACKUP_STATUS), (_event: any, arg: any) => {
      callback && callback(JSON.parse(arg));
    });
    ipcRenderer.send(GET_BACKUP_STATUS);
  },

  backupKeyPiece: (o: any[], callback: Function) => {
    ipcRenderer.once(getEventReplyName(BACKUP_KEY_PIECE), (_event: any, arg: any) => {
      callback && callback(JSON.parse(arg));
    });
    ipcRenderer.send(BACKUP_KEY_PIECE, o);
  },

  modifyPinCode: (o: any[], callback: Function) => {
    ipcRenderer.once(getEventReplyName(MODIFY_PIN_CODE), (_event: any, arg: any) => {
      callback && callback(JSON.parse(arg));
    });
    ipcRenderer.send(MODIFY_PIN_CODE, o);
  },

  verifyPinCode: (callback: Function) => {
    ipcRenderer.once(getEventReplyName(VERIFY_PIN_CODE), (_event: any, arg: any) => {
      callback && callback(JSON.parse(arg));
    });
    ipcRenderer.send(VERIFY_PIN_CODE);
  },

  restoreKeyPiece: (o: any[], callback: Function) => {
    ipcRenderer.once(getEventReplyName(RESTORE_KEY_PIECE), (_event: any, arg: any) => {
      callback && callback(JSON.parse(arg));
    });
    ipcRenderer.send(RESTORE_KEY_PIECE, o);
  },

  reset: (callback: Function) => {
    ipcRenderer.once(getEventReplyName(RESET), (_event: any, arg: any) => {
      callback && callback(JSON.parse(arg));
    });
    ipcRenderer.send(RESET);
  },

  ResetBackupInfo: (callback: Function) => {
    ipcRenderer.once(getEventReplyName(RESET_BACKUP_INFO), (_event: any, arg: any) => {
      callback && callback(JSON.parse(arg));
    });
    ipcRenderer.send(RESET_BACKUP_INFO);
  }
}
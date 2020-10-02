import * as eventCommand from '../event-command/keyAuth-fetch';
import {ipcRenderer} from "./electron";
import * as channels from "../channel/keyAuth";

const deviceAudit = (eventName: string, data: any[]) => {
  return ipcRenderer.invoke(channels.KEY_AUTH_FETCH, {eventName, data});
}

const getRootPubKey: (data: any[]) => Promise<any> = (data: any[]) => {
  return deviceAudit(eventCommand.GET_ROOT_PUB_KEY, data);
};

const downloadCa: (data: any[]) => Promise<any> = (data: any[]) => {
  return deviceAudit(eventCommand.DOWNLOAD_CA, data);
};

const saveKeyPiece: (data: any[]) => Promise<any> = (data: any[]) => {
  return deviceAudit(eventCommand.SAVE_KEY_PIECE, data);
};

const signNonce: (data: any[]) => Promise<any> = (data: any[]) => {
  return deviceAudit(eventCommand.SIGN_NONCE, data);
};

const getDeviceInfo: (data: any[]) => Promise<any> = (data: any[]) => {
  return deviceAudit(eventCommand.GET_DEVICE_INFO, data);
};

export default {
  getRootPubKey,
  downloadCa,
  saveKeyPiece,
  signNonce,
  getDeviceInfo,
};
import { ipcRenderer } from './electron';
import {
  GET_INFO,
  GET_KEY_AUTH_BY_DEVICE_ID,
  ADD_OR_UPDATE_KEYAUTH,
  REMOVE_KEYAUTH,
  GET_ALL_KEY_AUTHS,
  GET_KEYAUTHS_BY_PAGE,
  READY_TO_SHOW
} from '../channel/os';
import {getEventReplyName} from "../Event";
import { KeyAuthTemplate } from '../main/ipcMain/keyAuth-storage';

export default {

  getInfo: (callback: Function) => {
    ipcRenderer.once(getEventReplyName(GET_INFO), (_event: any, arg: any) => {
      callback(JSON.parse(arg));
    });
    ipcRenderer.send(GET_INFO);
  },

  getKeyAuth: (callback: Function) => {
    ipcRenderer.once(getEventReplyName(GET_KEY_AUTH_BY_DEVICE_ID), (_event: any, arg: any) => {
      callback(JSON.parse(arg));
    });
    ipcRenderer.send(GET_KEY_AUTH_BY_DEVICE_ID);
  },

  addOrUpdateKeyAuth(auth: KeyAuthTemplate, callback: Function) {
    ipcRenderer.once(getEventReplyName(ADD_OR_UPDATE_KEYAUTH), (_event: any, arg: any) => {
      callback(JSON.parse(arg));
    });
    ipcRenderer.send(ADD_OR_UPDATE_KEYAUTH, auth);
  },

  removeKeyAuth(deviceId: string, callback: Function) {
    ipcRenderer.once(getEventReplyName(REMOVE_KEYAUTH), (_event: any, arg: any) => {
      callback(JSON.parse(arg));
    });
    ipcRenderer.send(REMOVE_KEYAUTH, deviceId);
  },

  getKeyAuths(callback: Function) {
    ipcRenderer.once(getEventReplyName(GET_ALL_KEY_AUTHS), (_event: any, arg: any) => {
      callback(JSON.parse(arg));
    });
    ipcRenderer.send(GET_ALL_KEY_AUTHS);
  },

  getKeyAuthsByPage(beginOffset: number, pageSize: number,callback: Function) {
    console.log('getKeyAuthsByPage before render', beginOffset, pageSize);
    ipcRenderer.once(getEventReplyName(GET_KEYAUTHS_BY_PAGE), (_event: any, arg: any) => {
      console.log('getKeyAuthsByPage after render', arg);
      callback(JSON.parse(arg));
    });
    ipcRenderer.send(GET_KEYAUTHS_BY_PAGE, beginOffset, pageSize);
 },

  readyToShow() {
    ipcRenderer.send(READY_TO_SHOW);
  },
};
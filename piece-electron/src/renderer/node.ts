import { ipcRenderer, getEventReplyName } from './electron';
import * as channels from '../channel/node';

export const communication = (channel: string, data: any, callback?: Function) => {
  const replyName = getEventReplyName(channel);
  data.eventName = replyName;
  ipcRenderer.once(replyName, (_event: any, arg: any) => {
    callback && callback({eventName: replyName, data: JSON.parse(arg)});
  });
  setTimeout(() => {
    ipcRenderer.send(channel, JSON.stringify(data));
  }, 0);
  return replyName;
}

export default {
  saveCertificate: (data: any, callback?: Function) => {
    return communication(channels.SAVE_CERTIFICATE, data, callback);
  },

  verifyPayeeAddressInfo: (data: any, callback?: Function) => {
    return communication(channels.VERIFY_PAYEE_ADDRESS_INFO, data, callback);
  },

  getAddress: (data: any, callback?: Function) => {
    return communication(channels.GET_ADDRESS, data, callback);
  },

  getAddressList: (data: any, callback?: Function) => {
    return communication(channels.GET_ADDRESS_LIST, data, callback);
  },
};
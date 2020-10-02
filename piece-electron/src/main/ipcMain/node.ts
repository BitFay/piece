import { ipcMain } from 'electron';
import * as channels from "../../channel/node";
import {createOrProvideStorage} from "../storage";
const nodeStorage = createOrProvideStorage('node');
import {externalContact} from '../crypto/verifySign';
import {getAddress} from '../crypto/currencyAddress';

ipcMain.on(channels.SAVE_CERTIFICATE, (event: any, dataJsonString: string) => {
  const data = JSON.parse(dataJsonString);
  const {certificate} = data;
  nodeStorage.set('certificate', certificate);
  event.reply(data.eventName, JSON.stringify({save: true}));
});

ipcMain.on(channels.VERIFY_PAYEE_ADDRESS_INFO, (event: any, dataJsonString: string) => {
  const {payeeAddressAndSignature, eventName} = JSON.parse(dataJsonString);
  const addressList = payeeAddressAndSignature.map((item, i) => {
    const {hexCommand, signture} = item;
    return externalContact.getExternalContactAddress(hexCommand, signture);
  });
  const cleanAddressList = addressList.filter(item => item !== null);
  event.reply(eventName, JSON.stringify({addressList: cleanAddressList}));
});

ipcMain.on(channels.GET_ADDRESS, (event: any, dataJsonString: string) => {
  const {publicKey, type, eventName} = JSON.parse(dataJsonString);
  const address = getAddress(publicKey, type);
  event.reply(eventName, JSON.stringify({address}));
});

ipcMain.on(channels.GET_ADDRESS_LIST, (event: any, dataJsonString: string) => {
  const {tokenList, eventName} = JSON.parse(dataJsonString);
  const addressList = tokenList.map((item) => {
    const {name, path, publicKey} = item;
    return {name, path, address: getAddress(publicKey, path[0])};
  });
  event.reply(eventName, JSON.stringify({addressList}));
});
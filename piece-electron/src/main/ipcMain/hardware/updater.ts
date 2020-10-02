import {keystoreNodeModule} from '../device';
import fetch from 'node-fetch';
import {customEmitter} from '../event';
// const origin = 'http://resource.faycz.com/application_sig.bin';
import {getEventNameByCommand} from '../../../event-command/keyAuth-fetch';

const sendDataLength = 4096;

export const sendData = (info: any) => {
  return new Promise<any>((resolve) => {
    fetch(info.file, {}).then(res => res.arrayBuffer()).then(res => {
      console.info('electron->hardware update file length: '+res.length);
      const buf = Buffer.from(res);
      const bufLength = buf.length;
      if(bufLength > 0) {
        executeCommand(info.type, buf, 0, bufLength, resolve);
      }else{
        resolve(false);
      }
    });
  })
  
}

const executeCommand = (type, buf, offset, bufLength, resolve) => {
  if(offset < bufLength){
    const command = 'Download';
    const sendBuf = buf.slice(offset, offset + sendDataLength);
    const data = [
      {
        "type": type,
        "totalSize": bufLength,
        "offset": offset,
        "data": sendBuf.toString('hex')
      }
    ];
    const confirm = (device, res, name) => {
      console.info(device);
      console.info(res);
      console.info(name);
      if(res[0] && res[0].result === 'pass'){
        executeCommand(type, buf, offset + sendDataLength, bufLength, resolve);
      }else{
        resolve(false);
      }
    };
    customEmitter.once(getEventNameByCommand(command), confirm);
    keystoreNodeModule.executeCommand(command, data);
  }else{
    resolve(true);
  }
}

import { ipcMain } from 'electron';
import { KeystoreNodeModule, NativeEvent } from '@fay-react/node-device';
import { createOrProvideStorage } from '../storage';
import * as keyAuthChannels from '../../channel/keyAuth';
import {sendData} from './hardware/updater';

import {
    Connect,
    DISCONNECT,
    StartDiscovering,
    StopDiscovering,
    DISCOVER,
    GET_SN_BY_CONNECTING,
    PARSE_BACKUP_DATA,
    DONE,
    ADD_DISCONNECT_LISTENING,
    ADD_CONNECT_LISTENING, RECONNECT,
    REMOVE_DISCONNECT_LISTENING,
    BACKUP_KEYAUTH_STATUS,
    POST_IS_REGISTERED, REMOVE_CONNECT_LISTENING,
    IMPORT_BACKUP_STATUS,
    UPDATER,
    REBOOT,
    SETTING
} from '../../channel/device';

import {getEventReplyName} from '../../Event';
import {customEmitter} from "./event";

const OnDeviceDiscovered = 'onDeviceDiscovered';
const OnDeviceUpdate = 'onDeviceUpdate';
const OnDeviceDisappeared = 'onDeviceDisappeared';
const OnConnected = 'onConnected';
const OnConnectFailed = 'onConnectFailed';
const OnDisconnected = 'onDisconnected';
const OnSessionTimeOut = 'onSessionTimeOut';
const OnCommunicateFailed = 'onCommunicateFailed';

const deviceStorage = createOrProvideStorage('device');

export interface Device {
    name: string;
    serialNumber: string;
    publicKey: string;
    port: number;
    date?: Date
}

export const nativeEvent = new NativeEvent();
export const keystoreNodeModule = new KeystoreNodeModule(nativeEvent);

const devices: any = new Map<string, Device>();

export let sn: string | null;
export let connectedDevice: Device | null;
let reconnectStatus = false;
let connectData: any = null;
let connectType: any = 'Connect';

const removeDiscoverListeners = () => {
    nativeEvent.cleanListens(OnDeviceDiscovered);
    nativeEvent.cleanListens(OnDeviceDisappeared);
    nativeEvent.cleanListens(OnDeviceUpdate);
};

const getKey = (device: Device) => {
    return device.serialNumber;
};

const setDevice = (event: any, device: Device) => {
    const key = getKey(device);
    const _device = devices.get(key);
    if(!_device || (_device.publicKey !== device.publicKey)){
        devices.set(key, device);
        replyDeviceList(event);
    }
};

const removeDevice = (event: any, device: Device) => {
    const key = getKey(device);
    if(devices.get(key)){
        devices.delete(key);
        replyDeviceList(event);
    }
};

const replyDeviceList = (event: any) => {
    let _devices: Device[] = [];
    const storagedDevice: Device = deviceStorage.get('device', null);
    for (const d of devices.values()) {
        if(storagedDevice && storagedDevice.serialNumber === d.serialNumber){
            _devices = [{...d, date: storagedDevice.date}, ..._devices];
        }else{
            _devices.push(d);
        }
    }
    console.log(storagedDevice, _devices);
    event.reply(getEventReplyName(DISCOVER), JSON.stringify(_devices));
};

const startDiscover = (event: any) => {
    const onDiscovered = (device: Device, num: number) => {
        device.port = num;
        setDevice(event, device);
    };
    const onDisappeared = (device: Device, num: number) => {
        device.port = num;
        removeDevice(event, device);
    };
    const onUpdate = (device: Device, num: number) => {
        device.port = num;
        setDevice(event, device);
    };
    nativeEvent.on(OnDeviceDiscovered, onDiscovered);
    nativeEvent.on(OnDeviceDisappeared, onDisappeared);
    nativeEvent.on(OnDeviceUpdate, onUpdate);
    keystoreNodeModule.startDiscovering();
};

export const stopDiscover = () => {
    keystoreNodeModule.stopDiscovering();
    removeDiscoverListeners();
};

ipcMain.on(StartDiscovering, (event: any) => {
    devices.clear();
    removeDiscoverListeners();
    startDiscover(event);
});

ipcMain.on(StopDiscovering, (_e: any) => {
    stopDiscover();
});

ipcMain.on(Connect, (_event: any, serialNumber: string) => {
    const _device = devices.get(serialNumber);
    console.log('Connect', _device)
    // reconnectStatus = false;
    console.info('准备Connect连接');
    // if(sn){
    //     console.info('sn存在，准备先断开');
    //     keystoreNodeModule.disconnect(sn, connectedDevice!.port);
    // }
    console.log(sn);
    disconnect();
    console.log(sn);
    if(_device){
        console.log(_device);
        connectedDevice = _device;
        connectType = 'Connect';
        console.info('准备Connect');
        keystoreNodeModule.connect(serialNumber, _device.port);
    }
});

ipcMain.on(RECONNECT, (event: any) => {
    if(connectData){
        connectData.type = 'Reconnect'
        event.reply(getEventReplyName(ADD_CONNECT_LISTENING), JSON.stringify(connectData));
    }else{
        removeDiscoverListeners();
        const onDiscovered = (device: Device, port: number) => {
            console.info('onDiscovered Reconnect');
            console.info('');
            console.info('');
            console.info('');
            console.info('');
            console.info('');
            console.info('');
            console.info('');
            if(device.serialNumber === sn){
                reconnectStatus = true;
                connectType = 'Reconnect';
                keystoreNodeModule.connect(sn, port ? port : connectedDevice!.port);
            }
        };
        nativeEvent.on(OnDeviceDiscovered, onDiscovered);
        keystoreNodeModule.startDiscovering();
    }
});

export const disconnect = () => {
    if(sn){
        console.info('准备断开连接');
        keystoreNodeModule.disconnect(sn, connectedDevice!.port);
        console.info('准备sn清除');
        sn = null;
        console.info('准备connectedDevice清除');
        connectedDevice = null;
    }
};

ipcMain.on(DISCONNECT, (_event: any) => {
    disconnect();
});

ipcMain.on(ADD_DISCONNECT_LISTENING, (event: any) => {
    nativeEvent.on(OnDisconnected, (device: Device) => {
        connectData = null;
        event.reply(getEventReplyName(ADD_DISCONNECT_LISTENING), JSON.stringify({device}));
    });
});

ipcMain.on(REMOVE_DISCONNECT_LISTENING, (_event: any) => {
    nativeEvent.cleanListens(OnDisconnected);
});

ipcMain.on(ADD_CONNECT_LISTENING, (event: any) => {
    nativeEvent.on(OnConnected, (device: Device, protocol: number) => {
        console.log('ADD_CONNECT_LISTENING 000', device, protocol, reconnectStatus);
        sn = device.serialNumber;
        deviceStorage.set('device', {...device, date: new Date()});
        console.info('reconnectStatus', reconnectStatus);
        if(reconnectStatus){
            console.log('Reconnect');
            keystoreNodeModule.executeCommand('Reconnect', []);
            reconnectStatus = false;
            keystoreNodeModule.stopDiscovering();
            // nativeEvent.cleanListens(OnCallResultReceived);
            removeDiscoverListeners();
        }
        connectedDevice!.port = protocol;
        connectData = {connect: true, device, protocol};
        console.log('ADD_CONNECT_LISTENING reply before', device, protocol);
        event.reply(getEventReplyName(ADD_CONNECT_LISTENING), JSON.stringify({connect: true, device, protocol, type: connectType}));
    });

    nativeEvent.on(OnConnectFailed, (device: Device, error: number) => {
        event.reply(getEventReplyName(ADD_CONNECT_LISTENING), JSON.stringify({connect: false, device, protocol: error, type: 'OnConnectFailed'}));
    });

    nativeEvent.on(OnSessionTimeOut, (device: Device) => {
        event.reply(getEventReplyName(ADD_CONNECT_LISTENING), JSON.stringify({connect: false, device, type: 'OnSessionTimeOut'}));
    });

    nativeEvent.on(OnCommunicateFailed, (device: Device, error: number) => {
        event.reply(getEventReplyName(ADD_CONNECT_LISTENING), JSON.stringify({connect: false, device, protocol: error, type: 'OnCommunicateFailed'}));
    });
});

ipcMain.on(REMOVE_CONNECT_LISTENING, (_event: any) => {
    nativeEvent.cleanListens(OnConnected);
    nativeEvent.cleanListens(OnConnectFailed);
    nativeEvent.cleanListens(OnSessionTimeOut);
    nativeEvent.cleanListens(OnCommunicateFailed);
});

ipcMain.on(GET_SN_BY_CONNECTING, (event: any) => {
    event.reply(getEventReplyName(GET_SN_BY_CONNECTING), JSON.stringify({sn}));
});

ipcMain.on(PARSE_BACKUP_DATA, (_event: any, o: any[]) => {
    console.info('ParseBackupData', o);
    keystoreNodeModule.executeCommand('ParseBackupData', o);
});

ipcMain.on(DONE, (event: any) => {
    console.log('ipcMain done');
    customEmitter.emit(keyAuthChannels.DONE);
    if(sn){
        keystoreNodeModule.executeCommand('Done', []);
    }
});

ipcMain.on(BACKUP_KEYAUTH_STATUS, (event: any, o: any[]) => {
    keystoreNodeModule.executeCommand('Post', ['backupStatus', ...o]);
    event.reply(getEventReplyName(BACKUP_KEYAUTH_STATUS), JSON.stringify({status: 0}));
});

ipcMain.on(IMPORT_BACKUP_STATUS, (event: any, o: any[]) => {
    keystoreNodeModule.executeCommand('Post', ['backupImportStatus', ...o]);
});

ipcMain.on(POST_IS_REGISTERED, (_event: any, o: any[]) => {
    keystoreNodeModule.executeCommand('Post', ['isRegistered', ...o]);
});

ipcMain.handle(UPDATER, async (_event, o: any) => {
  keystoreNodeModule.stopDiscovering();
  console.info('electron: device updater wait1', new Date());
  console.info(o);
  const {firmware, bootloader, fonts, fs} = o;
  const updFirmwareResult = firmware ? await sendData(firmware) : true;
  const updBootloaderResult = bootloader ? await sendData(bootloader) : true;
  const updFontsResult = fonts ? await sendData(fonts) : true;
  const updFsResult = fs ? await sendData(fs) : true;
  const result = {firmware: updFirmwareResult, bootloader: updBootloaderResult, fonts: updFontsResult, fs: updFsResult};
  console.info('electron: device updater wait2', new Date());
  keystoreNodeModule.startDiscovering();
  console.log(result);
  return result;
})

ipcMain.handle(REBOOT, async (_event, o: any[]) => {
  keystoreNodeModule.executeCommand('Reboot', o);
})

ipcMain.handle(SETTING, async (_event, o: any[]) => {
  keystoreNodeModule.executeCommand('setting', o);
})

import { createOrProvideStorage } from '../storage';
import uuid from 'uuid/v4';
import os from 'os';

const KeyAuthStorage = 'keyAuth';
const KeyAuthStorageList = 'keyAuthList';
export const KeyAuthUUID = 'keyAuthUUID';

const keyAuthStorage = createOrProvideStorage(KeyAuthStorage);
const id = keyAuthStorage.get(KeyAuthUUID, '');
if (!id) keyAuthStorage.set(KeyAuthUUID, uuid());

export interface KeyAuthTemplate {
    name?: string;
    publicKey?: string;
    deviceId: string;
    time?: number;
    encryptedData?: string;
}

export function addOrUpdateKeyAuth(keyAuth: KeyAuthTemplate) {
    const keyAuths = getKeyAuths();
    const auth = findKeyAuthByDeviceId(keyAuth.deviceId, keyAuths);
    if (auth) {
        Object.assign(auth, keyAuth);
        keyAuthStorage.set(KeyAuthStorageList, keyAuths);
    } else {
        keyAuths.push(keyAuth);
        keyAuthStorage.set(KeyAuthStorageList, keyAuths);
    }
}

export function removeKeyAuth(deviceId: string) {
    const keyAuths = getKeyAuths();
    const auth = findKeyAuthByDeviceId(deviceId, keyAuths);
    const indexOf = keyAuths.indexOf(auth);
    if (indexOf !== -1) {
        keyAuths.splice(indexOf, 1);
        keyAuthStorage.set(KeyAuthStorageList, keyAuths);
    }
}

export function getKeyAuths() {
    return keyAuthStorage.get(KeyAuthStorageList, []);
}

export function getKeyAuthsByPage(beginOffset: number, pageSize: number) {
    const list = keyAuthStorage.get(KeyAuthStorageList, []);
    return {
        list: list.slice(beginOffset, beginOffset + pageSize),
        total: list ? list.length : 0,
        beginOffset,
    };
}

export function findKeyAuthByDeviceId(deviceId: string, keyAuths: KeyAuthTemplate[] = getKeyAuths()) {
    if (keyAuths && keyAuths.length && deviceId) {
        const find = keyAuths.find((keyAuth: KeyAuthTemplate) => deviceId === keyAuth.deviceId);
        return find ? find : '';
    }
    return '';
}

export function getAuthDeviceInfo() {
    return {
        hostname: os.hostname(),
        id: keyAuthStorage.get(KeyAuthUUID, ''),
    };
}

import { ipcMain } from 'electron';

import {
    GET_INFO,
    GET_KEY_AUTH_BY_DEVICE_ID,
    ADD_OR_UPDATE_KEYAUTH,
    REMOVE_KEYAUTH,
    GET_ALL_KEY_AUTHS,
    GET_KEYAUTHS_BY_PAGE,
    READY_TO_SHOW
} from '../../channel/os';
import {getEventReplyName} from "../../Event";
import {sn} from './device';
import { findKeyAuthByDeviceId, getAuthDeviceInfo, KeyAuthTemplate, addOrUpdateKeyAuth, removeKeyAuth, getKeyAuths, getKeyAuthsByPage } from './keyAuth-storage';
import {win} from '../index';

export let winReadyToShow = false;

ipcMain.on(GET_KEY_AUTH_BY_DEVICE_ID, (event: any) => {
    const keyAuth = sn?findKeyAuthByDeviceId(sn): '';
    event.reply(getEventReplyName(GET_KEY_AUTH_BY_DEVICE_ID), JSON.stringify(keyAuth));
});

ipcMain.on(GET_INFO, (event: any) => {
    const data = getAuthDeviceInfo();
    event.reply(getEventReplyName(GET_INFO), JSON.stringify(data));
});

ipcMain.on(ADD_OR_UPDATE_KEYAUTH, (event: any, auth: KeyAuthTemplate) => {
    try {
        addOrUpdateKeyAuth(auth);
        event.reply(getEventReplyName(ADD_OR_UPDATE_KEYAUTH), JSON.stringify({status: 0, auth}));
    } catch (e) {
        event.reply(getEventReplyName(ADD_OR_UPDATE_KEYAUTH), JSON.stringify({status: -1, auth}));
    }
});

ipcMain.on(REMOVE_KEYAUTH, (event: any, deviceId: string) => {
    try {
        removeKeyAuth(deviceId);
        event.reply(getEventReplyName(REMOVE_KEYAUTH), JSON.stringify({status: 0}));
    } catch (e) {
        event.reply(getEventReplyName(REMOVE_KEYAUTH), JSON.stringify({status: -1}));
    }
});

ipcMain.on(GET_ALL_KEY_AUTHS, (event: any) => {
    const data = getKeyAuths();
    event.reply(getEventReplyName(GET_ALL_KEY_AUTHS), JSON.stringify(data));
});

ipcMain.on(GET_KEYAUTHS_BY_PAGE, (event: any, beginOffset: number, pageSize: number) => {
    const data = getKeyAuthsByPage(beginOffset, pageSize);
    event.reply(getEventReplyName(GET_KEYAUTHS_BY_PAGE), JSON.stringify(data));
});

ipcMain.once(READY_TO_SHOW, (_event: any) => {
    if(!win.isVisible()){
        winReadyToShow = true;
    }
});
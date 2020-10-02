import { ipcMain } from 'electron';
import {customEmitter} from "./event";
import {getEventReplyName} from "../../Event";
import * as channels from "../../channel/keyAuth";

ipcMain.on(channels.ADD_BACKUP_KEY_AUTH_LISTENING, (event: any) => {
    customEmitter.on(channels.ADD_BACKUP_KEY_AUTH_LISTENING, (device, args, name) => {
        event.reply(getEventReplyName(channels.ADD_BACKUP_KEY_AUTH_LISTENING), JSON.stringify({device, name, encryptedData:args && args.encryptedData ? args.encryptedData : ''}));
    });
});

ipcMain.on(channels.RESET, (event: any) => {
    customEmitter.on(channels.RESET, () => {
        event.reply(getEventReplyName(channels.RESET));
    });
});

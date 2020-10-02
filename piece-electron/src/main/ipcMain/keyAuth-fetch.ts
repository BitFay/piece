import { ipcMain } from 'electron';
import {keystoreNodeModule} from './device';
import * as channels from '../../channel/keyAuth';
import * as eventCommand from '../../event-command/keyAuth-fetch';
import {customEmitter} from "./event";

interface Params{
    eventName: string
    data: any[]
}

const keystoreFetch = (command, data) => {
    return new Promise<any>(((resolve) => {
        customEmitter.once(eventCommand.getEventNameByCommand(command), (device, res) => {
            resolve(res);
        });
        command && keystoreNodeModule.executeCommand(command, data);
    }))
}

ipcMain.handle(channels.KEY_AUTH_FETCH, async (event, params: Params) => {
    const {eventName, data} = params;
    const command = eventCommand.getCommandByEventName(eventName);
    const result = await keystoreFetch(command, data);
    return result;
})

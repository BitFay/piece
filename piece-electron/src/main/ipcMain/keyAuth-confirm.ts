import { ipcMain } from 'electron';
import {keystoreNodeModule} from './device';
import * as channels from '../../channel/keyAuth';
import * as eventCommand from '../../event-command/keyAuth-event';
import {customEmitter} from './event';

interface Params{
    eventName: string
    data: any[]
}

const keystoreConfirm = (command, data) => {
    return new Promise<any>((resolve) => {
        const confirm = (device, res, name) => {
            resolve({confirm: name === 'Confirmed', data: res});
            customEmitter.off(channels.KEY_AUTH_CONFIRM, done);
        }
        const done = () => {
            resolve({done: true});
            customEmitter.off(channels.KEY_AUTH_CONFIRM, confirm);
        }
        customEmitter.once(channels.KEY_AUTH_CONFIRM, confirm);
        customEmitter.once(channels.DONE, done);
        command && keystoreNodeModule.executeCommand(command, data);
    })
}

ipcMain.handle(channels.KEY_AUTH_CONFIRM, async (event, params: Params) => {
    const {eventName, data} = params;
    const command = eventCommand.getCommandByEventName(eventName);
    console.log('wait1', new Date());
    const result = await keystoreConfirm(command, data);
    console.log('wait2', new Date());
    console.log(result);
    return result;
})

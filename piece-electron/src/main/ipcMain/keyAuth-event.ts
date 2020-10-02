import {Device, keystoreNodeModule, nativeEvent} from './device';
import {customEmitter} from './event';
import {getChannelNameByCommandReplyEventName} from '../../event-command/keyAuth-event';
import {getEventNameByCommand} from '../../event-command/keyAuth-fetch';

const OnCallResultReceived = 'onCallResultReceived';
const OnEventReceived = 'onEventReceived';

nativeEvent.on(OnEventReceived, (device: Device, name: string, args: any) => {
    const eventName = getChannelNameByCommandReplyEventName(name);
    customEmitter.emit(eventName, device, args, name);
    keystoreNodeModule.executeCommand('Done', []);
});

nativeEvent.on(OnCallResultReceived, (device: Device, name: string, args: any) => {
    const eventName = getEventNameByCommand(name);
    customEmitter.emit(eventName, device, args, name);
})

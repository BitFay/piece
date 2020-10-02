import * as events from "events";

const EventEmitter:any = events;

class CustomEmitter extends EventEmitter {}

export const customEmitter = new CustomEmitter();

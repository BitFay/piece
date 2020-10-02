let keystore;

keystore = require('./Keystore.node');

function add(event, events, type, func, context) {
  let listeners = events[type];
  if (!listeners) {
    listeners = [];
    events[type] = listeners;
  }
  if (context === event) {
    context = null;
  }
  const newListener = {
    fn: func,
    ctx: context,
  };
  if (listeners) {
    for (const {fn, ctx} of listeners) {
      if (func === fn && context === ctx) {
        return;
      }
    }
  }
  listeners.push(newListener);
}

function remove(event, events, type, func, context) {
  const listeners = events[type];
  if (!listeners) {
    return;
  }
  if (!func) {
    for (let index = 0; index < listeners.length; index++) {
      delete listeners[index].fn;
    }
    delete events[type];
    return;
  }
  if (context === event) {
    context = null;
  }
  if (listeners) {
    for (let index = 0; index < listeners.length; index++) {
      const {fn, ctx} = listeners[index];
      if (ctx !== context) {
        continue;
      }
      if (fn === func) {
        listeners.splice(index, 1);
        return;
      }
    }
  }
}

function fireEvent(event, events, type, ...data) {
  const listeners = events[type];
  if (listeners) {
    listeners.forEach((listener) => {
      const { ctx, fn } = listener;
      fn.apply(ctx || event, data);
    });
  }
}

function cleanEventType(events, type) {
  const listeners = events[type];
  if (listeners) {
    for (let index = 0; index < listeners.length; index++) {
      delete listeners[index].fn;
    }
  }
  delete events[type];
}

function hasEventType(events, type) {
  return !!events[type];
}

class NativeEvent {
  constructor() {
    this.onceEvents = {};
    this.events = {};
  }

  on(types, func, context) {
    return this.on_(this.events, types, func, context);
  }

  off(types, func, context) {
    const typesArr = types.split(',');
    if (typesArr.length > 0) {
      typesArr.map((type) => {
        remove(this, this.events, type, func, context);
      });
    }
    return this;
  }

  fire(type, ...data) {
    fireEvent(this, this.events, type, ...data);
    if (hasEventType(this.onceEvents, type)) {
      fireEvent(this, this.onceEvents, type, ...data);
      cleanEventType(this.onceEvents, type);
    }
    return this;
  }

  once(type, func, context) {
    return this.on_(this.onceEvents, type, func, context);
  }

  cleanListens(type) {
    cleanEventType(this.events, type);
    if (hasEventType(this.onceEvents, type)) {
      cleanEventType(this.onceEvents, type);
    }
    return this;
  }

  destroy() {
    Object.keys(this.events).forEach(k => this.cleanListens(k));
    Object.keys(this.onceEvents).forEach(k => this.cleanListens(k));
  }

  listens(type) {
    return hasEventType(this.events, type) || hasEventType(this.onceEvents, type);
  }

  on_(events, types, func, context) {
    const typesArr = types.split(',');
    if (typesArr.length > 0) {
      typesArr.map((type) => {
        add(this, events, type, func, context);
      });
    }
    return this;
  }
}

class KeystoreNodeModule {
  constructor(nativeEvent) {
    this._nativeEvent = nativeEvent;
    this._mangerProxy = new keystore.KeystoreNodeModule(nativeEvent);
  }

  startDiscovering() {
    this._mangerProxy.startDiscovering();
  }

  stopDiscovering() {
    this._mangerProxy.stopDiscovering();
  }

  connect(serialNumber, transportProtocol) {
    this._mangerProxy.connect(serialNumber, transportProtocol);
  }

  disconnect(serialNumber, transportProtocol) {
    this._mangerProxy.disconnect(serialNumber, transportProtocol);
  }

  executeCommand(method, args) {
    this._mangerProxy.executeCommand(method, args);
  }

  getConnectedInfo() {
    this._mangerProxy.getConnectedInfo();
  }

  getBleStatus() {
    this._mangerProxy.getBleStatus();
  }
}

module.exports = {
  NativeEvent,
  KeystoreNodeModule,
};
import Store from 'electron-store';
import * as fs from 'fs';
import * as path from 'path';

import { privateDataPath } from './config';

export const storagesPath = path.join(privateDataPath, 'storages');
if (!fs.existsSync(storagesPath)) {
    fs.mkdirSync(storagesPath);
}

const stores = new Map<string, Store<any>>();

export const createOrProvideStorage = (storage: string, sPath = storagesPath): Store => {
    console.log('createOrProvideStorage', storage, sPath, hasStorage(storage));
    let store = stores.get(storage);
    if (!store) {
        store = new Store({
            name: storage,
            cwd: sPath,
        });
        stores.set(storage, store);
    }
    return store;
};

export const hasStorage = (storage: string): boolean => {
    return stores.has(storage);
};

export const deleteStorage = (storage: string, sPath = storagesPath) => {
    if (!hasStorage(storage)) {
        return;
    }
    const store = createOrProvideStorage(storage, sPath);
    if (store) store.clear();
};
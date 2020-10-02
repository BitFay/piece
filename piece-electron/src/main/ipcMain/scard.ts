import { ipcMain } from 'electron';
import { ScardNodeModule } from '@fay-react/node-scard';

export const scard = new ScardNodeModule();

import {
    START_LISTENING,
    CONNECT,
    DISCONNECT,
    GET_ID,
    RESET_BACKUP_INFO,
    RESET,
    RESTORE_KEY_PIECE,
    VERIFY_PIN_CODE,
    MODIFY_PIN_CODE,
    BACKUP_KEY_PIECE,
    GET_BACKUP_STATUS,
    GET_PUBLIC_KEY,
} from '../../channel/scard';

import {getEventReplyName} from "../../Event";

ipcMain.on(START_LISTENING, (event: any) => {
    console.log('SetListener ipc main before', event);
    scard.SetListener((res: any) => {
        console.log('SetListener ipc main', res);
        console.log(getEventReplyName(START_LISTENING));
        event.reply(getEventReplyName(START_LISTENING), JSON.stringify({res}));
    })
});

ipcMain.on(CONNECT, (event: any) => {
    scard.SCardConnect().then((_res: boolean) => {
        event.reply(getEventReplyName(CONNECT), JSON.stringify({status: 0}));
    }).catch((_e: any) => {
        event.reply(getEventReplyName(CONNECT), JSON.stringify({status: -1}));
    });
});

ipcMain.on(DISCONNECT, (event: any) => {
    scard.SCardDisconnect().then((_res: boolean) => {
        event.reply(getEventReplyName(DISCONNECT), JSON.stringify({status: 0}));
    }).catch((_e: any) => {
        event.reply(getEventReplyName(DISCONNECT), JSON.stringify({status: -1}));
    });
});

ipcMain.on(GET_ID, (event: any) => {
    scard.GetSCardId().then((res: any) => {
        event.reply(getEventReplyName(GET_ID), JSON.stringify({status: 0, res}));
    }).catch((_e: any) => {
        event.reply(getEventReplyName(GET_ID), JSON.stringify({status: -1, res: _e}));
    });
});

ipcMain.on(GET_PUBLIC_KEY, (event: any) => {
    scard.GetSCardPublicKey().then((res: any) => {
        event.reply(getEventReplyName(GET_PUBLIC_KEY), JSON.stringify({status: 0, res}));
    }).catch((_e: any) => {
        event.reply(getEventReplyName(GET_PUBLIC_KEY), JSON.stringify({status: -1, res: _e}));
    });
});

ipcMain.on(GET_BACKUP_STATUS, (event: any) => {
    scard.GetSCardBackupStatus().then((res: any) => {
        event.reply(getEventReplyName(GET_BACKUP_STATUS), JSON.stringify({status: 0, res}));
    }).catch((_e: any) => {
        event.reply(getEventReplyName(GET_BACKUP_STATUS), JSON.stringify({status: -1, res: _e}));
    });
});

ipcMain.on(BACKUP_KEY_PIECE, (event: any, o: any[]) => {
    scard.BackupKeyPiece(o[0]).then((res: any) => {
        event.reply(getEventReplyName(BACKUP_KEY_PIECE), JSON.stringify({status: 0, res}));
    }).catch((_e: any) => {
        event.reply(getEventReplyName(BACKUP_KEY_PIECE), JSON.stringify({status: -1, res: _e}));
    });
});

ipcMain.on(MODIFY_PIN_CODE, (event: any, o: any[]) => {
    scard.ModifyPinCode(o).then((res: any) => {
        event.reply(getEventReplyName(MODIFY_PIN_CODE), JSON.stringify({status: 0, res}));
    }).catch((_e: any) => {
        event.reply(getEventReplyName(MODIFY_PIN_CODE), JSON.stringify({status: -1, res: _e}));
    });
});

ipcMain.on(VERIFY_PIN_CODE, (event: any) => {
    scard.VerifyPinCode().then((res: any) => {
        event.reply(getEventReplyName(VERIFY_PIN_CODE), JSON.stringify({status: 0, res}));
    }).catch((_e: any) => {
        console.log('VerifyPinCode ipcMain', _e);
        event.reply(getEventReplyName(VERIFY_PIN_CODE), JSON.stringify({status: -1, res: _e}));
    });
});

ipcMain.on(RESTORE_KEY_PIECE, (event: any, o: any[]) => {
    scard.RestoreKeyPiece(o).then((res: any) => {
        event.reply(getEventReplyName(RESTORE_KEY_PIECE), JSON.stringify({status: 0, res}));
    }).catch((_e: any) => {
        event.reply(getEventReplyName(RESTORE_KEY_PIECE), JSON.stringify({status: -1, res: _e}));
    });
});

ipcMain.on(RESET, (event: any) => {
    scard.SCardReset().then((res: any) => {
        event.reply(getEventReplyName(RESET), JSON.stringify({status: 0, res}));
    }).catch((_e: any) => {
        event.reply(getEventReplyName(RESET), JSON.stringify({status: -1, res: _e}));
    });
});

ipcMain.on(RESET_BACKUP_INFO, (event: any) => {
    scard.SCardResetBackupInfo().then((res: any) => {
        event.reply(getEventReplyName(RESET_BACKUP_INFO), JSON.stringify({status: 0, res}));
    }).catch((_e: any) => {
        event.reply(getEventReplyName(RESET_BACKUP_INFO), JSON.stringify({status: -1, res: _e}));
    });
});
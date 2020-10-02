var createObject = require('./build/Release/scard.node');

class ScardNodeModule {
    constructor() {
        this.obj = createObject();
    }

    SetListener(callback){
        this.obj.SetListener((res) => {
            let result = JSON.parse(res).result
            callback(result)
        });
    }

    SCardConnect() {
        return new Promise((resolve, reject) => {
            try {
                this.obj.SCardConnect(msg => {
                    if (msg) {
                        resolve(JSON.parse(msg))
                    } else {
                        reject(JSON.parse(msg))
                    }
                });
            } catch (e) {
                reject(false)
            }
        })
    }

    SCardDisconnect() {
        return new Promise((resolve, reject) => {
            try {
                this.obj.SCardDisconnect(msg => {
                    const parseMsg = JSON.parse(msg);
                    if (parseMsg.errorCode === 0) {
                        resolve(JSON.parse(msg))
                    } else {
                        reject(JSON.parse(msg))
                    }
                });
            } catch (e) {
                reject(false)
            }
        })
    }

    GetSCardId(){
        return new Promise((resolve, reject) => {
            try {
                this.obj.GetSCardId(msg => {
                    const parseMsg = JSON.parse(msg);
                    if (parseMsg.errorCode === 0) {
                        resolve(JSON.parse(msg))
                    } else {
                        reject(JSON.parse(msg))
                    }
                });
            } catch (e) {
                reject(msg)
            }
        })
    }

    GetSCardPublicKey(){
        return new Promise((resolve, reject) => {
            try {
                this.obj.GetSCardPublicKey(msg => {
                    const parseMsg = JSON.parse(msg);
                    if (parseMsg.errorCode === 0) {
                        resolve(JSON.parse(msg))
                    } else {
                        reject(JSON.parse(msg))
                    }
                });
            } catch (e) {
                reject(msg)
            }
        })
    }

    GetSCardBackupStatus(){
        return new Promise((resolve, reject) => {
            try {
                this.obj.GetSCardBackupStatus(msg => {
                    const parseMsg = JSON.parse(msg);
                    if (parseMsg.errorCode === 0) {
                        resolve(JSON.parse(msg))
                    } else {
                        reject(JSON.parse(msg))
                    }
                });
            } catch (e) {
                reject(msg)
            }
        })
    }

    BackupKeyPiece(info)　{
        return new Promise((resolve, reject) => {
            try {
                this.obj.BackupKeyPiece(JSON.stringify(info), (msg) => {
                    const parseMsg = JSON.parse(msg);
                    if (parseMsg.errorCode === 0) {
                        resolve(JSON.parse(msg))
                    } else {
                        reject(JSON.parse(msg))
                    }
                });
            } catch (e) {
                reject(msg)
            }
        })
    }

    ModifyPinCode() {
        return new Promise((resolve, reject) => {
            try {
                this.obj.ModifyPinCode(msg => {
                    const parseMsg = JSON.parse(msg);
                    if (parseMsg.errorCode === 0) {
                        resolve(JSON.parse(msg))
                    } else {
                        reject(JSON.parse(msg))
                    }
                });
            } catch (e) {
                reject(msg)
            }
        })
    }

    VerifyPinCode() {
        return new Promise((resolve, reject) => {
            try {
                this.obj.VerifyPinCode(msg => {
                    const parseMsg = JSON.parse(msg);
                    if (parseMsg.errorCode === 0) {
                        resolve(JSON.parse(msg))
                    } else {
                        reject(JSON.parse(msg))
                    }
                });
            } catch (e) {
                reject(msg)
            }
        })
    }

    RestoreKeyPiece(info) {
        return new Promise((resolve, reject) => {
            try {
                this.obj.RestoreKeyPiece(JSON.stringify(info), (msg)=> {
                    const parseMsg = JSON.parse(msg);
                    if (parseMsg.errorCode === 0) {
                        resolve(JSON.parse(msg))
                    } else {
                        reject(JSON.parse(msg))
                    }
                });
            } catch (e) {
                reject(msg)
            }
        })
    }

    SCardReset() {
        return new Promise((resolve, reject) => {
            try {
                this.obj.SCardReset(msg => {
                    const parseMsg = JSON.parse(msg);
                    if (parseMsg.errorCode === 0) {
                        resolve(JSON.parse(msg))
                    } else {
                        reject(JSON.parse(msg))
                    }
                });
            } catch (e) {
                reject(msg)
            }
        })
    }

    SCardResetBackupInfo() {
        return new Promise((resolve, reject) => {
            try {
                this.obj.SCardResetBackupInfo(msg => {
                    const parseMsg = JSON.parse(msg);
                    if (parseMsg.errorCode === 0) {
                        resolve(JSON.parse(msg))
                    } else {
                        reject(JSON.parse(msg))
                    }
                });
            } catch (e) {
                reject(msg)
            }
        })
    }
}

module.exports = {
    ScardNodeModule,
};


// scard = new ScardNodeModule();
// scard.SetListener( (res) => {
//     console.log('helloworld_', res)
// });
//
// scard.SCardConnect()
//     .then(res =>  {
//         if (res) {
//             // scard.ModifyPinCode().then(res => console.log('ModifyPinCode cb = ',res))
//             // .catch(e => console.log(e))
//             scard.SCardResetBackupInfo().then(res => console.log('SCardResetBackupInfo cb = ',res))
//             .catch(e => console.log(e))
//         }
//     }).catch(e => console.log('fail'));
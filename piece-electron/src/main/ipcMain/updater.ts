import {getEventReplyName} from "../../Event";
// tslint:disable-next-line:ban-ts-ignore
// @ts-ignore
import {build} from '../../../package/pro/package.json';
// tslint:disable-next-line:ban-ts-ignore
// @ts-ignore
import {build as devBuild} from '../../../package/dev/package.json';
import {
  START_TO_CHECK_UPDATE,
  CHECKING_FOR_UPDATE,
  UPDATE_AVAILABLE,
  UPDATE_NOT_AVAILABLE,
  DOWNLOAD_UPDATE,
  ERROR,
  DOWNLOAD_PROGRESS,
  UPDATE_DOWNLOADED,
  QUIT_AND_INSTALL
} from "../../channel/updater";
import {autoUpdater} from "electron-updater";
import {ipcMain} from "electron";
import {win, readyWin} from '../index';
import {winReadyToShow} from './os';
import {SemVer} from "semver";

// const feedURL = 'http://localhost:8000/assets/download/app/';
const feedURL = process.env.NODE_ENV === 'development' ? devBuild.publish[0].url : build.publish[0].url;
// const feedURL = 'https://download.keystore.com/keystore-app/';
autoUpdater.setFeedURL(feedURL);
autoUpdater.autoDownload = false;
autoUpdater.allowPrerelease = true;

// let check = false;

ipcMain.on(START_TO_CHECK_UPDATE, (_event: any) => {
  if(process.env.NODE_ENV === 'development'){
    console.info('this is development env, do not need to ask update, just up');
    winShowSetTimeout();
  }else{
    autoUpdater.logger!.info(START_TO_CHECK_UPDATE);
    autoUpdater.checkForUpdates();
  }
  // if(check){
  //   event.reply(getEventReplyName(UPDATE_NOT_AVAILABLE), jsonStringifyData(''));
  // }else{
  //   check = true;
  //   autoUpdater.checkForUpdates().then((value) => {
  //     console.log(value);
  //   });
  // }
});

let winShowTimeout;
let winShowTimeoutCount = 0;

const winShowSetTimeout = () => {
  winShowTimeout = setTimeout(() => {
    if(winReadyToShow) {
      if(readyWin && readyWin.isVisible()){
        readyWin.close();
        readyWin.destroy();
      }
      win.show();
      win.focus();
    }else{
      winShowSetTimeout();
    }
    winShowTimeoutCount++;
    if(winShowTimeoutCount % 10 === 0){
      win.reload();
    }
  }, 1000);
}

const jsonStringifyData = (message: any) => JSON.stringify({message});

autoUpdater.on('checking-for-update', (message: any) => {
  autoUpdater.logger!.info('checking-for-update');
  autoUpdater.logger!.info(message);
  readyWin.webContents.send(getEventReplyName(CHECKING_FOR_UPDATE), jsonStringifyData(message));
});

autoUpdater.on('update-available', (message: any) => {
  autoUpdater.logger!.info('update-available');
  autoUpdater.logger!.info(message);
  readyWin.webContents.send(getEventReplyName(UPDATE_AVAILABLE), jsonStringifyData(message));
});

autoUpdater.on('update-not-available', (message: any) => {
  autoUpdater.logger!.info('update-not-available');
  autoUpdater.logger!.info(message);
  readyWin.webContents.send(getEventReplyName(UPDATE_NOT_AVAILABLE), jsonStringifyData(message));
  winShowSetTimeout();
});

ipcMain.on(DOWNLOAD_UPDATE, () => {
  autoUpdater.logger!.info(DOWNLOAD_UPDATE);
  autoUpdater.downloadUpdate();
});

autoUpdater.on('error', (err: any) => {
  autoUpdater.logger!.info('error');
  autoUpdater.logger!.error(err);
  readyWin.webContents.send(getEventReplyName(ERROR), jsonStringifyData(err));
});

autoUpdater.addListener('download-progress', (progressInfo: any) => {
  // if (win) {
  //   win.setProgressBar(progressInfo.percent);
  // }
  autoUpdater.logger!.info('download-progress');
  autoUpdater.logger!.info(progressInfo);
  readyWin.setProgressBar(progressInfo.percent);
  readyWin.webContents.send(getEventReplyName(DOWNLOAD_PROGRESS), jsonStringifyData(progressInfo));
});

autoUpdater.addListener('update-downloaded', (info: any) => {
  autoUpdater.logger!.info('update-downloaded');
  autoUpdater.logger!.info(info);
  readyWin.webContents.send(getEventReplyName(UPDATE_DOWNLOADED), jsonStringifyData(info));

});

ipcMain.on(QUIT_AND_INSTALL, () => {
  autoUpdater.logger!.info(QUIT_AND_INSTALL);
  autoUpdater.quitAndInstall();
  win && win.destroy();
  readyWin && readyWin.destroy();
});


// const checkForUpdates = (event: any) => {
//
//   // autoUpdater.removeAllListeners();
//   //
//   // autoUpdater.setFeedURL(feedURL);
//   // autoUpdater.autoDownload = false;
//   // autoUpdater.allowPrerelease = true;
//
//   autoUpdater.addListener('checking-for-update', (message: any) => {
//     autoUpdater.logger!.info(message);
//     event.reply(getEventReplyName(CHECKING_FOR_UPDATE), jsonStringifyData(message));
//   });
//
//   autoUpdater.addListener('update-available', (message: any) => {
//     autoUpdater.logger!.info(message);
//     event.reply(getEventReplyName(UPDATE_AVAILABLE), jsonStringifyData(message));
//   });
//
//   autoUpdater.addListener('update-not-available', (message: any) => {
//     autoUpdater.logger!.info(message);
//     event.reply(getEventReplyName(UPDATE_NOT_AVAILABLE), jsonStringifyData(message));
//   });
//
//   ipcMain.addListener(DOWNLOAD_UPDATE, () => {
//     autoUpdater.downloadUpdate();
//   });
//
//   autoUpdater.addListener('error', (err: any) => {
//     autoUpdater.logger!.error(err);
//     event.reply(getEventReplyName(ERROR), jsonStringifyData(err));
//   });
//
//   autoUpdater.addListener('download-progress', (progressInfo: any) => {
//     // if (win) {
//     //   win.setProgressBar(progressInfo.percent);
//     // }
//     if (readyWin) {
//       readyWin.setProgressBar(progressInfo.percent);
//     }
//     event.reply(getEventReplyName(DOWNLOAD_PROGRESS), jsonStringifyData(progressInfo));
//   });
//
//   autoUpdater.addListener('update-downloaded', (info: any) => {
//     event.reply(getEventReplyName(UPDATE_DOWNLOADED), jsonStringifyData(info));
//     ipcMain.addListener(QUIT_AND_INSTALL, () => {
//       autoUpdater.quitAndInstall();
//       // win && win.destroy();
//       readyWin && readyWin.destroy();
//     });
//   });
//
//   autoUpdater.checkForUpdates().then((value) => {
//     console.log(value);
//   });
// };

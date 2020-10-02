import { shell } from './electron';

export default {
  openBrowser: (url: string) => {
    shell.openExternal(url);
  },

}
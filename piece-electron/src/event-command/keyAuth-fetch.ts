export const GET_ROOT_PUB_KEY = 'device/getRootPubKey';
export const DOWNLOAD_CA = 'device/downloadCa';
export const SAVE_CERTIFICATE = 'device/saveCertificate';
export const SAVE_KEY_PIECE = 'device/saveKeyPiece';
export const SIGN_NONCE = 'device/signNonce';
export const GET_DEVICE_INFO = 'device/getDeviceInfo';
export const DOWNLOAD = 'device/download';

export const getCommandByEventName = (eventName: string) => {
  switch (eventName) {
    case GET_ROOT_PUB_KEY:
      return 'GetRootPublickey';
    case DOWNLOAD_CA:
      return 'SaveCertificate';
    case SAVE_KEY_PIECE:
      return 'SaveKeyShare';
    case SIGN_NONCE:
      return 'SignNonce';
    case GET_DEVICE_INFO:
      return 'GetDeviceInfo';
    case DOWNLOAD:
      return 'Download';
    default:
      return null;
  }
}

export const getEventNameByCommand = (command: string) => {
  switch (command) {
    case 'GetRootPublickey':
      return GET_ROOT_PUB_KEY;
    case 'SaveCertificate':
      return DOWNLOAD_CA;
    case 'SaveKeyShare':
      return SAVE_KEY_PIECE;
    case 'SignNonce':
      return SIGN_NONCE;
    case 'GetDeviceInfo':
      return GET_DEVICE_INFO;
    case 'Download':
      return DOWNLOAD;
    default:
      return null;
  }
}


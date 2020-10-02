import {getAddress as getBTCAddress} from './btc';
import {getAddress as getETHAddress} from './eth';
import {getAddress as getBCHAddress} from './bch';
import {getAddress as getLTCAddress} from './ltc';
import {getAddress as getFilecoinAddress} from './filecoin';

const getAddressFunctionAndTypeMapping = {
  '1': getBTCAddress,
  '100': getETHAddress,
  '111': getBCHAddress,
  '102': getLTCAddress,
  '0': getBTCAddress,
  '60': getETHAddress,
  '110': getBCHAddress,
  '2': getLTCAddress,
  '5': getFilecoinAddress,
  '6': getFilecoinAddress,
}

export const getAddress = (publicKey, type) => {
  const getAddressFunction = getAddressFunctionAndTypeMapping[''+type];
  return getAddressFunction(publicKey, type);
}
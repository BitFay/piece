/**
 * Create by fay on 2020/3/24 12:21 下午
 */
import {createECDSA, curve} from '../ecdsa';
import ca from '../certificate';
const ecdsa = createECDSA();
import * as crypto from 'crypto';
import {createOrProvideStorage} from "../../storage";
const nodeStorage = createOrProvideStorage('node');
import { SHA3 } from 'sha3';

const magicAscii = "4149";
const version = '01';
const coinTypeByteLength = 1;
const addressLengthByteLength = 2;
const labelLengthByteLength = 2;

const getPublicKeyHex = (certificateHex) => {
  const certificate = ca.analysisCertificate(certificateHex);
  const compressedPublicKeyHex = ca.getOrgPublicKeyHex(certificate.certificateDecode);
  return crypto.ECDH.convertKey(compressedPublicKeyHex, curve, 'hex', 'hex', 'uncompressed');
}

export const transferData = (dataHex) => {
  const _data: any = {};
  _data.magic = Buffer.from(magicAscii, 'hex').toString();
  _data.version = Number(version);
  let surStr = dataHex.substring(magicAscii.length+version.length);
  _data.coinType = Number.parseInt(surStr.substr(0, coinTypeByteLength*2), 16);
  surStr = surStr.substring(coinTypeByteLength*2);
  const addressLength = Number.parseInt(surStr.substr(0, addressLengthByteLength*2), 16);
  surStr = surStr.substring(addressLengthByteLength*2);
  _data.address = Buffer.from(surStr.substr(0, addressLength*2), 'hex').toString();
  surStr = surStr.substring(addressLength*2);
  const labelLength = Number.parseInt(surStr.substr(0, labelLengthByteLength*2), 16);
  surStr = surStr.substring(labelLengthByteLength*2);
  _data.label = Buffer.from(surStr.substr(0, labelLength*2), 'hex').toString('utf8');
  return _data;
}

const transferToHashHex = (data: any, dataHex) => {
  console.info('data', data);
  const _data = dataHex.substr(0, magicAscii.length+version.length+coinTypeByteLength*2)+Buffer.from(data.address, 'utf8').toString('hex')+Buffer.from(data.label, 'utf8').toString('hex');
  const hashSha3Size256 = new SHA3(256);
  hashSha3Size256.update(Buffer.from(_data, 'hex'));
  return hashSha3Size256.digest('hex');
}

const verify = (certificateHex, data, dataHex, signature) => {
  const publicKeyHex = getPublicKeyHex(certificateHex);
  const msgHashHex = transferToHashHex(data, dataHex);
  return ecdsa.verifyHex(msgHashHex, signature, publicKeyHex);
}

export const getExternalContactAddress = (dataHex, signature) => {
  const data = transferData(dataHex);
  const certificateHex = nodeStorage.get('certificate');
  const verifyResult = verify(certificateHex, data, dataHex, signature);
  if(verifyResult){
    return {coinType: data.coinType, address: data.address}
  }
  return null;
}

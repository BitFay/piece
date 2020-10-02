/**
 * Create by fay on 2020/4/1 3:52 下午
 */
import {blake2bInit, blake2bUpdate, blake2bFinal} from 'blakejs';
import base32 from 'base32.js';
import convertHex from 'convert-hex';

const main = 'f';
const test = 't';

export const getAddress = (publicKey: string, version: number) => {
  const network = version === 6 ? main : test;

  const blake2b160 = blake2bInit(20, null);
  blake2bUpdate(blake2b160, convertHex.hexToBytes(publicKey));
  const blake2b160Hex = Buffer.from(blake2bFinal(blake2b160)).toString('hex');

  const checksum = blake2bInit(4, null);
  blake2bUpdate(checksum, convertHex.hexToBytes('01'+blake2b160Hex));
  const checksumHex = Buffer.from(blake2bFinal(checksum)).toString('hex');

  const base32Encode = base32.encode(convertHex.hexToBytes(blake2b160Hex+ checksumHex));
  return network + '1' + base32Encode.toLowerCase();
}
/**
 * Create by fay on 2020/4/1 3:52 下午
 */
import bs58 from 'bs58';
import {sha256, ripemd160} from "../hash";

const main = 0x00;
const test = 0x6f;

export const getAddress = (compressedPublicKey: string, version: number) => {
  const publicKeyBuffer = Buffer.from(compressedPublicKey, 'hex');
  const hash1Sha256 = sha256(publicKeyBuffer);
  const hashRipemd160 = ripemd160(hash1Sha256);
  const netWork = version === 0 ? main : test;
  const versionBuffer = Buffer.from([netWork]);
  let extendedPriKey = Buffer.alloc(hashRipemd160.length + versionBuffer.length);
  extendedPriKey = Buffer.concat([versionBuffer, hashRipemd160], extendedPriKey.length);
  const hash2Sha256 = sha256(extendedPriKey);
  const hash3Sha256 = sha256(hash2Sha256);
  const checksum = Buffer.alloc(4);
  hash3Sha256.copy(checksum, 0, 0, checksum.length);
  let btcAddress = Buffer.alloc(extendedPriKey.length + checksum.length);
  btcAddress = Buffer.concat([extendedPriKey, checksum], btcAddress.length);
  return bs58.encode(btcAddress);
}
/**
 * Create by fay on 2020/4/1 3:52 下午
 */
import secp256k1 from 'secp256k1';
import {keccak256} from "../hash";

export const getAddress = (compressedPublicKey: string) => {
  let uncompressedPublicKey: any = compressedPublicKey;
  if(compressedPublicKey.length === 66){
    uncompressedPublicKey = Buffer.from(secp256k1.publicKeyConvert(Uint8Array.from(Buffer.from(compressedPublicKey, 'hex')), false)).toString('hex');
  }
  const hashPublicKey = uncompressedPublicKey.substr(2, uncompressedPublicKey.length);
  const keccak256Hash = keccak256(Buffer.from(hashPublicKey, 'hex')).toString('hex');
  return '0x' + keccak256Hash.substr(24, 64);
}
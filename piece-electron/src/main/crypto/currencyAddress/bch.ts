/**
 * Create by fay on 2020/4/1 3:52 下午
 */
import bch from 'bitcore-lib-cash';

const main = 'bitcoincash';
const test = 'bchtest';

export const getAddress = (publicKey: string, version: number) => {
  const network = version === 110 ? main : test;
  return new bch.PublicKey(publicKey, {network}).toAddress().toString();
}
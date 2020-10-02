/**
 * Create by fay on 2020/4/1 3:52 下午
 */
import ltc from 'litecore-lib';

const test = 'testnet';

export const getAddress = (publicKey: string, version: number) => {
  const network = version === 2 ? undefined : test;
  return new ltc.PublicKey(publicKey, {network}).toAddress().toString();
}
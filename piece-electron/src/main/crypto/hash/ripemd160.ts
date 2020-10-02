import * as hash from 'hash.js';

export default (buffer: Buffer): Buffer => {
  return Buffer.from(hash.ripemd160().update(buffer).digest());
}
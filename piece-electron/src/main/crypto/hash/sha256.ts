import * as hash from 'hash.js';

export default (buffer: Buffer): Buffer => {
  return Buffer.from(hash.sha256().update(buffer).digest());
}
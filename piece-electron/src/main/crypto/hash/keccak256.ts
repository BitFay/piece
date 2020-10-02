import {keccak256} from 'ethereumjs-util';

export default (buffer: Buffer): Buffer => {
  return Buffer.from(keccak256(buffer));
}
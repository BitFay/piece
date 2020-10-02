import jsrsasign from 'jsrsasign';

export const curve = 'prime256v1';

let ecdsa;

export const createECDSA = () => {
  if(!ecdsa){
    ecdsa = new jsrsasign.KJUR.crypto.ECDSA({curve});
  }
  return ecdsa;
}
interface User {
  email: string;
  name?: string;
  phone?: string;
  certificate?: string;
  publicKey?: Buffer | EC.KeyPair;
  privateKey?: string;
  userCode?: string;
  sign?: EC.Signature | EC.SignatureOptions;
  [key: string]: any;
}
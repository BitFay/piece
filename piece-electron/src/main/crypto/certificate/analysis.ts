/**
 * Create by fay on 2020/3/24 12:21 下午
 */
const DATA_TYPES = {
  'BINARY': 'binary',
  'HEX': 'hex',
  'INT16': 'int16',
};
const magic = '4354';
const versionByteLength = 1;
const typeByteLength = 1;
const publicKeyByteLength = 33;
const expiresByteLength = 8;
const fieldKeyByteLength = 1;
const signatureLengthByteLength = 1;

const fields = {
  '01': {
    name: 'ID',
    type: DATA_TYPES.BINARY,
    length: 2
  },
  '02': {
    name: 'Name',
    type: DATA_TYPES.HEX,
    length: 2
  },
  '03': {
    name: 'Email',
    type: DATA_TYPES.HEX,
    length: 2
  },
  '04': {
    name: 'WebSite',
    type: DATA_TYPES.HEX,
    length: 2
  },
  '80': {
    name: 'Permission',
    type: DATA_TYPES.INT16,
    length: 2
  }
}

const analysisFields = (_fields, certificateEncode) => {
  const fieldsKey = certificateEncode.substr(0, fieldKeyByteLength*2);
  if(Object.keys(fields).includes(fieldsKey)){
    const field = fields[fieldsKey];
    certificateEncode =  certificateEncode.substring(fieldKeyByteLength*2);
    if(field.type === DATA_TYPES.BINARY){
      const dataLength = certificateEncode.substr(0, field.length*2);
      certificateEncode = certificateEncode.substring(field.length*2);
      _fields[field.name] = certificateEncode.substr(0, Number.parseInt(dataLength,16)*2);
      certificateEncode = certificateEncode.substring(Number.parseInt(dataLength,16)*2);
    }
    if(field.type === DATA_TYPES.HEX){
      const dataLength = certificateEncode.substr(0, field.length*2);
      certificateEncode = certificateEncode.substring(field.length*2);
      _fields[field.name] = certificateEncode.substr(0, Number.parseInt(dataLength,16)*2);
      _fields[field.name] = Buffer.from(_fields[field.name], 'hex').toString();
      certificateEncode = certificateEncode.substring(Number.parseInt(dataLength,16)*2);
    }
    if(field.type === DATA_TYPES.INT16){
      const data = certificateEncode.substr(0, field.length*2);
      _fields[field.name] = Number.parseInt(data,16);
      certificateEncode = certificateEncode.substring(field.length*2);
    }
    return analysisFields(_fields, certificateEncode);
  }else if(fieldsKey === '00'){
    certificateEncode = certificateEncode.substring(2);
    return {
      fields: _fields, certificateEncode
    }
  }else{
    return {};
  }
}

export const analysisCertificate = (certificateEncode='') => {
  const certificateDecode: any = {};
  if(!certificateEncode.startsWith(magic)){
    return {certificateEncode, certificateDecode: undefined};
  }
  certificateEncode = certificateEncode.substring(magic.length+versionByteLength*2);
  certificateDecode.type = Number(certificateEncode.substr(0, typeByteLength*2));
  certificateEncode = certificateEncode.substring(typeByteLength*2);
  certificateDecode.publicKey = certificateEncode.substr(0, publicKeyByteLength*2);
  certificateEncode = certificateEncode.substring(publicKeyByteLength*2);
  certificateDecode.expires = Number.parseInt(certificateEncode.substr(0, expiresByteLength*2), 16);
  certificateEncode = certificateEncode.substring(expiresByteLength*2);
  const {fields: _fields, certificateEncode: _certificateEncode} = analysisFields({}, certificateEncode);
  certificateDecode.fields = _fields;
  certificateEncode = _certificateEncode;
  const signatureLength = Number.parseInt(certificateEncode.substr(0, signatureLengthByteLength*2), 16)*2;
  certificateEncode = certificateEncode.substring(signatureLengthByteLength*2);
  certificateDecode.signature = certificateEncode.substr(0, signatureLength);
  certificateEncode = certificateEncode.substring(signatureLength);
  const ca = analysisCertificate(certificateEncode);
  ca.certificateDecode && (certificateDecode.issuer = ca.certificateDecode);
  certificateEncode = ca.certificateEncode;
  return {certificateEncode, certificateDecode};
}

// const certificateEncode1 = '43540103031d08480b6bc691857af5b451393107e99be960682fffcdaf263e9e272d93e874000000005ea96ccd0200047362333203000b736233324073622e636f6d80ffff00483046022100ee6796fee41d7c1b756c7ceaf492825dbffd72885039521ed80debb652917bbe022100a551aded3872dd8487bbc4998e7375471cf461913a5562806617fefce2d2bc6a43540102024881032c349b325bb0a30ebd73688731fe6c373ea5e51477e9f55cdf436ed3f600000000662e3acd01002069ddb0082515fe204d3501d34e4c5d3d5f1a11a84bab646bd345bacf4b851bf90200047362333204001468747470733a2f2f6b657973746f72652e636f6d00473045022100f6a80eb86599a25497cda4f7ff810de2c30d584b224a02774668d89465cbf6170220436f4913f000f337d7b4251276066a0c5fc6630192327607deee7c15fb31aa1643540100035c37acb26e81218176f86bb47f6ff92a0c550a87acf1100fd2a544ce5ef303230000000070dbd8800200144b657973746f7265204c4c4320526f6f7420434104001468747470733a2f2f6b657973746f72652e636f6d0046304402201c5c771945b9462a6f7381c583b5bc02bcbb7bacd718839c908b28770b7f6a310220578ba122a5934ed5073b1af5a640cb9857032f71fde166b1287f7978dba3945e';
// const ca1 = analysisCertificate(certificateEncode1);

// const certificateEncode2 = '43540103026fc723666d5a4ce2de15daa6b7bf607122059faf7d4fd0f8c3d9a0914cba6c4f0000000060559fee020006e9b98fe8be8903001470656e67687569406b657973746f72652e636f6d80000000473045022003b1f01f5090a3a8f221fcd11aeed443d5b31e507356feb25786c4e501f15ac2022100ae9dc7fa32a72cb3d25f60495f24b35f3d85fa9878ad146ce70177e44b68b54a4354010203525c261417b0134b8e55fb55ef193c80473b45d34a0241edb02f05a04f344fd30000000067d90dfe010020d0b7260c2e04b898ef5c4c408620db7850562cb3b6c9940f60ca33027087d53602001231323331636563656365636563656365636504001468747470733a2f2f6b657973746f72652e636f6d004830460221009b90336856b6bf0451ad46a8814ba869fd36d25f829d1e54a05a64bac0a49bea022100c89e931fb4f1c8ac105fe8cf63db4ff02897f1f8b092f8b852b48065bf95bd5843540100021ff3e794858731fdff96a5238cf04592967cbe558592720949f281012a012d760000000070dbd88002001b4b455953544f52452047524f555020434f2e2c204c494d4954454404001868747470733a2f2f7777772e6b657973746f72652e636f6d00473045022100ffb4ffa8aa781ebd58b054eeb8ce4f88dd4faa6618c368bb83a978d97c338c4b02201ac16be9c95e37956611988537e7322ef57238e4f8be32d854071feae0b2f78c';
// const ca2 = analysisCertificate(certificateEncode2);

export const getOrgPublicKeyHex = (certificate) => {
  if(!certificate) return null;
  if(certificate.type === 2){
    return certificate.publicKey;
  }else{
    return getOrgPublicKeyHex(certificate.issuer);
  }
}

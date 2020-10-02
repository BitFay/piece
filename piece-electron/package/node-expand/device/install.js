const fs = require('fs')
const install = process.platform;

let plat = 'mac'
if (install === 'win32') plat = 'win';
if (install === 'darwin') plat = 'mac';

let file = fs.createReadStream(`./${plat}/Keystore.node`);
let out = fs.createWriteStream('./Keystore.node');

file.pipe(out);

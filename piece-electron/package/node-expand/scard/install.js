const fs = require('fs')
const install = process.platform;

let plat = 'mac'
if (install === 'win32') plat = 'win';
if (install === 'darwin') plat = 'mac';

let file = fs.createReadStream(`./${plat}/build/Release/scard.node`);
let out = fs.createWriteStream('./build/Release/scard.node');

file.pipe(out);

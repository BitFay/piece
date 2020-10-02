const fs = require('fs');
const dest = './package/pro/dist/package.json';
const innerPublishUrl = 'http://192.168.100.140/';

try {
  const data = fs.readFileSync(dest);
  let packageData = data.toString();
  packageData = JSON.parse(packageData);
  const publishUrl = packageData.build.publish[0].url;
  console.log(publishUrl === innerPublishUrl?'内网':'外网');
  if(publishUrl === innerPublishUrl){
    const version = packageData.version;
    const versionArr = version.split('.');
    console.log(versionArr, packageData.build.artifactName.split('.')[1]);
    versionArr[2] = Number(versionArr[2]) + Number(packageData.build.artifactName.split('.')[1]);
    packageData.version = versionArr.join('.');
    const str = JSON.stringify(packageData);
    fs.writeFileSync(dest,str);
  }
}catch (e) {
  console.error(e);
}




import {getUser} from '@fay-react/lib/user';
import {BASE_URL} from '@/env';

interface Upload {
  file: File,
  callback: Function,
  onloadstart?: Function,
  ontimeout?: Function,
  onerror?: Function,
  onloadend?: Function
}

export const upload = ({
  file,
  callback,
  onloadstart,
  ontimeout,
  onerror,
  onloadend
}: Upload) => {
  const xhr = new XMLHttpRequest();
  if(file.size>1000000000) {
    alert('文件不得超过1G')
    return
  }
  var formData = new FormData();
  formData.append('file', file);
  let loaded = 0, ot = 0, total = 0, oloaded = 0, complete = 0;
  xhr.onload = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // setTimeout(()=> {
      //   // alert('上传成功')
      //   // window.location.reload();
      // },1000)
    }
  };
  xhr.upload.onprogress = (event: any) => {
    // event.total是需要传输的总字节，event.loaded是已经传输的字节。如果event.lengthComputable不为真，则event.total等于0
    if (event.lengthComputable) {//
        loaded = event.loaded;
        total = event.total;
        complete = (event.loaded / event.total * 100);
        // progress.innerHTML = Math.round(complete) + "%";
        // progress.style.width = complete + '%';
    }
    // var time = document.getElementById("time");
    const nt = new Date().getTime();//获取当前时间
    const pertime = (nt-ot)/1000; //计算出上次调用该方法时到现在的时间差，单位为s
    ot = new Date().getTime(); //重新赋值时间，用于下次计算
    const perload = event.loaded - oloaded; //计算该分段上传的文件大小，单位b      
    oloaded = event.loaded;//重新赋值已上传文件大小，用以下次计算
    //上传速度计算
    let speed = perload/pertime;//单位b/s
    const bspeed = speed;
    let units = 'b/s';//单位名称
    if(speed/1024>1){
        speed = speed/1024;
        units = 'k/s';
    }
    if(speed/1024>1){
        speed = speed/1024;
        units = 'M/s';
    }
    // 剩余时间
    const resttime = ((event.total-event.loaded)/bspeed).toFixed(1);
    // time.innerHTML = '传输速度：'+speed+units+'，剩余时间：'+resttime+'s';
    // if(bspeed==0) time.innerHTML = '上传已取消';
    callback(loaded, total, complete, speed.toFixed(1)+units, resttime);
  };

  xhr.onloadstart = () => {
    console.log("上传开始");
    onloadstart && onloadstart(); 
  }

  xhr.ontimeout = () => {
    ontimeout && ontimeout();
    console.log('上传超时.');
  }

  xhr.onerror = () => {
    onerror && onerror();
    console.log("上传错误，可能是断网了，也可能是断请求服务了.");  // 这里存在异步传输问题
    return
  }
  xhr.onloadend = () => {
    onloadend && onloadend();
    console.log("请求结束"); // 发送上传的请求，至于有没有上传成功，不清楚，可能失败 成功，这里只是请求结束了
  }
  xhr.open('post', BASE_URL+'/files/upload', true);
  xhr.setRequestHeader('Authorization', getUser().token);
  xhr.send(formData);
  return xhr;
}


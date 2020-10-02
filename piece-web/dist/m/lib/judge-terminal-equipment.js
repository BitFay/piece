/**
 * Create by fay on 5/18/20 11:07 下午
 */
var pathname = window.location.pathname;
var currentIsPcPath = pathname.indexOf("/home")===0;
if (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
  if (currentIsPcPath) {
    window.location.href = '/m';
  }
} else {
  if (!currentIsPcPath) {
    if(pathname.indexOf("/m/reset")===0){
      window.location.href = '/home/reset';
    }else{
      window.location.href = '/home';
    }
  }
}
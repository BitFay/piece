import React from "react";

interface Props{
  submit: boolean
  onChange: any
}

let iframe: HTMLIFrameElement | undefined;
export default ({submit, onChange}: Props) => {
  // const iframeRef = React.createRef<any>();
  const [loadOAuth2, setLoadOAuth2] = React.useState(false);
  // const [iframeSrc, setIframeSrc] = React.useState<string|null>(null);
  const [key, setKey] = React.useState<number>(1);

  const receiveMessage = (event: any) => {
    // if (event.origin !== window.location.origin && event.origin.indexOf('localhost') < 0)
    // return;
    const data: any = event.data || {};
    if(data.load){
      setLoadOAuth2(true);
    }
    if(data.loginSuccess){
      document.cookie = "OAUTH2SESSION="+data.data["OAUTH2SESSION"]+"; expires=; path=/;";
      onChange(true);
    }
    if(data.loginFailed){
      onChange(false);
      setKey(key+1);
    }
  }

  React.useEffect(() => {
    window.addEventListener("message", receiveMessage, false);
    iframe = document.createElement('iframe');
    if (location?.origin.indexOf('keypool.dev') !== -1) {
      iframe.src = 'https://www.keypool.dev/oauth2/login/';
    } else {
      iframe.src = 'https://www.keypool.com/oauth2/login/';
    }
    iframe.id="fay-iframe";
    iframe.name="fay-iframe";
    iframe.style.display="none";
    document.body.appendChild(iframe);
  }, []);

  React.useEffect(() => {
    if(submit && loadOAuth2){
      iframe && iframe.contentWindow!.postMessage({login: true, cookie: document.cookie}, "*");
    }
  }, [submit, loadOAuth2]);
  return (
    <div/>
  )
}
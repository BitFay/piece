import React from 'react';
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import Provider from '@/app/provider';
import {PATH_PREFIX} from "@/env";
import 'swiper/swiper-bundle.css';

interface Props {
  Component: any
  pageProps: object
}

export default function MyApp(props: Props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>KeyPool: Get Filecoin with Ease</title>
        <meta name="keywords" content="KeyPool,云算力,filecoin,ipfs,filecoin挖矿,区块链,云存储,云计算,去中心化,方块云存储,资产存管"/>
        <meta name="description" content="KeyPool是Keystore旗下的基于Filecoin网络的技术服务平台,由资深区块链研发工程师，边缘计算及分布式存储专家倾力打造，创始团队来自Intel,分布式资本，奇虎360等企业"/>
        <link rel="canonical" href="https://www.keypool.com" />
        <meta name="baidu-site-verification" content="tYWNDaSPd6" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="manifest" href={`${PATH_PREFIX}/manifest.json?v=1`} />
        <link rel="icon" type="image/x-icon" href={`${PATH_PREFIX}/favicon.ico`} />
        <link rel="apple-touch-icon" href={`${PATH_PREFIX}/static/pwa.png`}></link>
        <meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no,minimal-ui"/>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="full-screen" content="yes"/>
        <meta name="x5-fullscreen" content="true"/>
        <meta content="telephone=no" name="format-detection" />
        <meta content="email=no" name="format-detection" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-173238218-1"></script>
        <script src={`${PATH_PREFIX}/lib/analytics.js`}></script>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <script src={`${PATH_PREFIX}/lib/judge-terminal-equipment.js`}/>
      </Head>
      <Provider>
        <CssBaseline />
        <Component {...pageProps} />
      </Provider>
    </React.Fragment>
  );
}


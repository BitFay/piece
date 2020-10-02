/**
 * Create by fay on 4/22/20 10:31 下午
 */
import ThemeProvider from '@/components/provider/theme-provider';
import React from "react";
// import {getJson} from '@fay-react/lib/fetch';
// import {BASE_SERVICE_URL} from '@/env';

export default ({children}: any) => {

  // React.useEffect(() => {
  //   const order = localStorage.getItem('order');
  //   const ids: any = [];
  //   if(order){
  //     const orderArr = JSON.parse(order);
  //     orderArr.map((id: string) => {
  //       getJson({path: BASE_SERVICE_URL+'/no-auth/order/alipayResultNotifyWithTradeNo/'+id}).then(() =>{
  //         ids.push(id);
  //         const order2 = localStorage.getItem('order');
  //         const orderArr2 = JSON.parse(order2!);
  //         orderArr2.splice(orderArr2.findIndex((orderArrId: string) => orderArrId === id), 1);
  //         console.log(orderArr2);
  //         localStorage.setItem('order', JSON.stringify(orderArr2));
  //       })
  //     })
  //   }
  // }, [])

  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  )
};
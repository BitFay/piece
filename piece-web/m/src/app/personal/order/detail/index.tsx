import React from 'react';
import Banner from './banner';
import Services from './services';
import {makeStyles} from "@material-ui/core/styles";
import Detail from "./detail";
import {Theme} from "@/components/theme";
import {getJson} from '@fay-react/lib/fetch';
import {BASE_SERVICE_URL} from '@/env';
import {Order} from '../index.d';
import {getQueryString} from '@fay-react/lib/router';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {

  },
  content: {
    padding: theme.spacing(2),
    position: 'absolute',
    bottom: 16,
    top: 140,
    overflow: 'auto'
  },
  uPaidContent: {
    bottom: 109,
  }
}));

export default () => {
  const classes = useStyles();

  const [data, setData] = React.useState<Order|undefined>(undefined);
  const [qr, setQr] = React.useState('');
  const [wx, setWx] = React.useState(false);

  const getData = () => {
    if (!getQueryString("id")) return;
    getJson({ path: BASE_SERVICE_URL + `/order/detail/${getQueryString("id")}` })
    .then((res: any) => {
      if (res.status === 0) {
        setData(res.detail);
        if(res.detail.status === 'Paid' && res.detail.payMethod === 'WeChat') {
          setWx(false);
          setQr('');
        }
      } else {
        setData(undefined);
      }
    })
  }

  React.useEffect(() => {
    getData();
    if (!wx) {
      return () => {};
    } else {
      const interval = setInterval(() => {
        getData();
      }, 5000)
      return () => {
        clearInterval(interval);
      }
    }
  }, [wx])

  const unPaid = data && data.status === 'UnPaid';
  const qrHandle = (val: string) => {setQr(val); setWx(true)};
  return (
    <div className={classes.root}>
      <Banner data={data} onChange={getData}/>
      <div className={clsx(classes.content, {[classes.uPaidContent]: unPaid && qr === ''})}>
        {data && <Detail data={data} qr={qr}/>}
      </div>
      {unPaid && qr === '' && <Services data={data!} payHandle={qrHandle}/>}
    </div>
  )
}
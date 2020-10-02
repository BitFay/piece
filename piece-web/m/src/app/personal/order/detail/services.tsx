import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { BASE_SERVICE_URL } from "@/env";
import { Order } from '../index.d';
import { postJson } from '@fay-react/lib/fetch';
import PriceText from '@/components/text/price';
import CircularProgress from '@material-ui/core/CircularProgress';
// import ExpandLess from '@material-ui/icons/ExpandLess';
import Notif from '@/app/contract/pay/drawer-noti';

interface Props {
  data: Order,
  payHandle?: Function
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    padding: theme.spacing(0, 2, 1.5, 2),
    background: theme.palette.common.white,
  },
  content: {
    // paddingBottom: theme.spacing(1.5),
  },
  checkboxLabel: {
    fontSize: '0.75rem'
  },
  pay: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: 'center',
    width: '100%',
    paddingTop: theme.spacing(1.5),
  },
  payBtn: {
    width: 90,
    height: 36
  },
  more: {
    display: 'flex'
  },
  custom: {
    color: '#D70D26'
  },
}));

export default ({ data }: Props) => {
  const classes = useStyles();
  const [notify, setNotify] = React.useState(false);
  const [form, setForm] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const toggleDrawer = (notify: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setNotify(notify);
  };

  const pay = () => {
    setLoading(true);
    // if (data?.payMethod === 'AliPay') {
      postJson({ path: BASE_SERVICE_URL + '/order/alipayPayment/create/' + data?.orderId }).then(res => {
        setLoading(false);
        if (res.status === 0) {
          setForm(res.body);
        } else {
          // Router.reload();
        }
      })
    // } else {
    //   return
    //   postJson({ path: BASE_SERVICE_URL + '/order/wxPayment/create/' + data?.orderId }).then(res => {
    //     setLoading(false);
    //     if (res.status === 0) {
    //       payHandle && payHandle(res.url);
    //     }
    //   })
    // }
  }

  React.useEffect(() => {
    if (form !== '') {
      const order = localStorage.getItem("order");
      let orderArr = [data!.orderId];
      if (order) {
        orderArr = [...JSON.parse(order), data!.orderId];
      }
      localStorage.setItem("order", JSON.stringify(orderArr));
      document.forms[0].submit();
    }
  }, [form]);

  return (
    <div className={classes.root}>
      <Divider />
      <div className={classes.pay}>
        <div className={classes.more}>
          <Typography className={classes.custom} >总计：<PriceText value={data?.payAmount} /></Typography>
        </div>
        <Button disabled={loading || data?.payMethod === 'WeChat'} variant={"contained"} color={"primary"} onClick={pay} className={classes.payBtn}>
          <Typography style={{ position: 'absolute', fontSize: '14px' }}>确认支付</Typography>
          {loading &&
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute' }}>
              <CircularProgress size={20} />
            </div>
          }
        </Button>
      </div>
      { data?.couponFormula ? <Notif open={notify} des={data?.couponFormula} onClose={toggleDrawer(false)} /> : null}
      <div dangerouslySetInnerHTML={{ __html: form }}></div>
    </div>
  );
};

import React from 'react';
import { makeStyles, Theme } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import NumberFormatTextField from "@/components/text-field/number-add-sub";
import PayMode from "../pay-mode";
import Button from "@material-ui/core/Button";
import PriceText from '@/components/text/price';
import CircularProgress from '@material-ui/core/CircularProgress';
import { postJson, getJson } from '@fay-react/lib/fetch';
import Router from 'next/router';
import { PATH_PREFIX, BASE_SERVICE_URL } from '@/env';
// import ExpandLess from '@material-ui/icons/ExpandLess';
import Empty from '@/components/icons/empty';
import Drawer from './drawer-code';
import Notif from './drawer-noti';
import { Product } from "@/app/product/index.d";
import { Coupon } from './coupon';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .MuiDrawer-paperAnchorBottom': {
      borderRadius: '16px 16px 0px 0px'
    }
  },
  content: {
    padding: theme.spacing(2.5, 2, 2.5, 2)
  },
  top: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  price: {
    fontSize: '0.875rem',
    color: '#212121',
    display: 'flex',
    alignItems: 'center'
  },
  discount: {
    fontSize: '0.75rem',
    color: '#263BE0',
    fontWeight: 500,
    border: '1px solid #263BE0',
    padding: '1px 8px'
  },
  textField: {
    marginTop: theme.spacing(2),
    width: '100%',
  },
  center: {
    textAlign: 'center'
  },
  pay: {
    marginTop: theme.spacing(2),
    height: 36
  },
  footer: {
    width: '100%',
    height: 48,
    position: 'fixed',
    bottom: 0,
    padding: theme.spacing(0, 2),
    background: theme.palette.common.white,
    display: "flex",
    justifyContent: "space-between",
    alignItems: 'center',
    boxShadow: '0px -1px 0px 0px rgba(224,224,224,1)'
  },
  footerPrice: {
    fontWeight: 500
  },
  footerbtn: {
    width: 112,
    height: 40
  },
  more: {
    display: 'flex'
  },
  custom: {
    color: '#D70D26',
    width: 15,
    height: 23,
    marginLeft: 5
  },
}));

export default () => {
  const classes = useStyles();
  const [count, setCount] = React.useState(1);
  const [state, setState] = React.useState({ mode: 1, checked: false, open: false, notify: false });
  const [data, setData] = React.useState<Product>();
  const [couponInfo, setCouponInfo] = React.useState<Coupon | null>();
  const [loading, setLoading] = React.useState(false);
  const [amount, setAmount] = React.useState(0);
  const [min, setMin] = React.useState(0);
  const [error, setError] = React.useState('');
  React.useEffect(() => {
    setError('');
  }, []);

  React.useEffect(() => {
    getJson({ path: BASE_SERVICE_URL + '/no-auth/product/detail/' + Router.query.id }).then((res) => {
      if (res.status === 0) {
        setData(res.detail);
        const min = Math.min(res.detail.minSubscribeUnits, res.detail.remainingUnits);
        setMin(min);
        setAmount(min * res.detail.pricePerUnit);
      } else {
        // error
      }
    })
  }, []);

  const handleChange = (e: any) => {
    const count = Number(e.target.value);
    const amount = Number(e.target.value) * (data ? data.pricePerUnit : 0);
    setCount(count);
    setAmount(amount);
    setError('');
    if (couponInfo) {
      getCouponInfo(couponInfo.code, amount, count).then((res: any) => {
        if (res.status === 0) {
          setError('');
          setCouponInfo({
            ...res.couponInfo,
            discountCondition: res.discountCondition,
            discountQuota: res.discountQuota,
            discountValue: res.discountValue,
            couponFormula: res.couponFormula,
            orderAmountAfterDiscount: res.orderAmountAfterDiscount,
            couponStatus: res.couponStatus
          });
        } else {
          // setCouponInfo(null);
        }
      })
    }
  }

  const payModeChange = (mode: any, checked: any) => {
    setState({ ...state, mode, checked })
  }

  const getCouponInfo = (coupon: string, a?: number, c?: number) =>
    postJson({
      path: BASE_SERVICE_URL + '/order/prePlaceWithCoupon',
      data: {
        coupon,
        orderAmount: a ? a : amount,
        orderPricePerUnit: data?.pricePerUnit,
        orderUnits: c ? c : count,
        payAmount: a ? a : amount,
        productId: data?.id
      }
    });

  const handleCreateOrder = () => {
    setLoading(true);
    postJson({
      path: BASE_SERVICE_URL + '/order/place', data: {
        coupon: couponInfo ? couponInfo?.code : '',
        "orderAmount": amount,
        "orderPricePerUnit": data?.pricePerUnit,
        "orderUnits": count,
        "payAmount": couponInfo ? couponInfo?.orderAmountAfterDiscount : amount,
        "payMethod": state.mode === 1 ? 'AliPay' : 'WeChat',
        "productId": data?.id
      }
    }).then((res) => {
      setLoading(false);
      if (res.status === 0) {
        setError('');
        Router.push({
          pathname: PATH_PREFIX + "/personal/order/detail",
          query: {
            id: res.orderId
          }
        })
      } else {
        setError(res.message)
        couponInfo?.code ? null : alert(res.message);
      }
    })
  }

  const toggleDrawer = (open: boolean, notify: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setState({ ...state, open, notify });
  };

  const couponDes = () => {
    if(couponInfo?.discountType === 'Amount') {
      return '满' + couponInfo?.discountCondition + '减' + couponInfo?.discountValue;
    } else if (couponInfo?.discountType === 'Percent') {
      return couponInfo?.discountValue * 100 + '%折扣';
    } else if (couponInfo?.discountType === 'Price') {
      return '特价' + couponInfo?.discountPrice + '/TB，共' + couponInfo?.discountQuota + 'TB'
    }
    return ''
  }

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div className={classes.top}>
          <Typography className={classes.price} color={"textSecondary"}>单价：<PriceText value={data?.pricePerUnit} />/TB </Typography>
          <Button className={classes.discount} onClick={toggleDrawer(true, false)}>使用优惠码</Button>
        </div>
        <NumberFormatTextField
          // label={"数量"}
          value={count}
          className={classes.textField}
          onChange={handleChange}
          InputProps={{
            inputProps: { decimalSeparator: false, allowNegative: false, max: data?.remainingUnits }
          }}
          // error={Boolean(error && error.length)}
          // helperText={error}
        />
        <PayMode data={data} error={error} coupon={couponInfo} count={count} onChange={payModeChange} />
      </div>
      <div className={classes.footer}>
        <div className={classes.more} >
          <Typography color={"secondary"} className={classes.footerPrice}><PriceText value={couponInfo ? couponInfo?.orderAmountAfterDiscount : amount} /></Typography>
          {couponInfo?.couponStatus === 'Normal' ? <Empty className={classes.custom} onClick={toggleDrawer(false, true)} /> : null}
        </div>
        <Button disabled={!state.checked || (count < min || min <= 0) || loading} className={classes.footerbtn} variant={"contained"} color={"primary"} onClick={handleCreateOrder}>
          <Typography style={{ position: 'absolute', fontSize: '14px' }}>立即购买</Typography>
          {loading &&
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute' }}>
              <CircularProgress size={20} />
            </div>
          }
        </Button>
        <Drawer open={state.open} onClose={toggleDrawer(false, false)} onRequest={getCouponInfo} onResult={(val: Coupon) => {setError(''); setCouponInfo(val)}} />
        <Notif open={state.notify} des={couponDes()} onClose={toggleDrawer(false, false)} />
      </div>
    </div>
  )
}
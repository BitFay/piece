import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {PATH_PREFIX} from '@/env';
import { Order } from '../index.d';
import PayTime from '@/components/text/pay-time';
import clsx from 'clsx';

interface Props{
  data?: Order
  onChange: Function
}

const height = 100;

const useStyles = makeStyles((theme) => ({
  root: {
    height,
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    width: '100%',
    paddingTop: theme.spacing(3.25),
  },
  UnPaid: {
    background: `url('${PATH_PREFIX}/static/banner/pay_await.png') no-repeat center`,
    backgroundSize: 'cover',
  },
  Fail: {
    background: `url('${PATH_PREFIX}/static/banner/pay_fail.png') no-repeat center`,
    backgroundSize: 'cover',
  },
  Paid: {
    background: `url('${PATH_PREFIX}/static/banner/pay_succ.png') no-repeat center`,
    backgroundSize: 'cover',
  },
  Expired: {
    background: `url('${PATH_PREFIX}/static/banner/pay_timeout.png') no-repeat center`,
    backgroundSize: 'cover',
  },
  content: {
    height: 50,
    display: "flex",
    alignItems: "center",
  },
  left: {
    marginLeft: theme.spacing(2.5)
  },
  title1: {
    fontWeight: 'bold'
  },
  title2: {
    marginTop: theme.spacing(1),
    fontSize: '0.75rem'
  },
}));

export default ({data, onChange}: Props) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, data ? classes[data.status] : null)}>
      <div className={classes.content}>
        <div className={classes.left}>
          {
            data && data.status === "UnPaid" ?
            <>
              <Typography variant={"body2"} className={classes.title1}>待付款</Typography>
              <Typography variant={"body2"} className={classes.title2}>请在15分钟内完成支付：<PayTime remainingTime={data.remainingPayTime} onTimeout={onChange}/></Typography>
            </>
            :
            data && data.status === "Fail" ?
            <>
              <Typography variant={"body2"} className={classes.title1}>支付失败</Typography>
              <Typography variant={"body2"} className={classes.title2}>未完成支付，请重新发起支付</Typography>
            </>
            :
            data && data.status === "Expired" ?
            <>
              <Typography variant={"body2"} className={classes.title1}>订单失效</Typography>
              <Typography variant={"body2"} className={classes.title2}>在有效时间内未完成支付</Typography>
            </>
            :
            data && data.status === "Paid" ?
            <>
              <Typography variant={"body2"} className={classes.title1}>已完成</Typography>
              <Typography variant={"body2"} className={classes.title2}>订单已完成支付</Typography>
            </>
            :
            <>
              <Typography variant={"body2"} className={classes.title1}>订单状态获取中...</Typography>
            </>
          }
        </div>
      </div>
    </div>
  );
};

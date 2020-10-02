import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import { Theme } from "@/components/theme";
import Button from "@material-ui/core/Button";
// import Router from 'next/router';
// import { PATH_PREFIX, BASE_SERVICE_URL } from '@/env';
// import { Product } from "@/app/product/index.d";
import CircularProgress from '@material-ui/core/CircularProgress';
import TF from '@/components/text-field';
import HighlightOff from '@material-ui/icons/HighlightOff';
// import { Coupon } from "./coupon.d";

interface Props {
  open: boolean
  onClose: any
  onRequest: Function
  onResult: Function
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .MuiDrawer-paperAnchorBottom': {
      borderRadius: '16px 16px 0px 0px'
    }
  },
  content: {
    padding: theme.spacing(0, 2, 2.5, 2)
  },
  title: {
    color: '#212121',
    fontSize: '1.25rem',
    fontWeight: 500
  },
  price: {
    fontSize: '0.75rem'
  },
  textField: {
    marginTop: theme.spacing(3.5),
    width: '100%',
  },
  center: {
    textAlign: 'center'
  },
  pay: {
    height: 48
  },
  topContent: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '5px 5px 0 0'
  },
  topImg: {
    width: 20,
    height: 20
  },
  tf: {
    margin: theme.spacing(4, 0, 5.5)
  }
}));

export default ({ open, onClose, onRequest, onResult }: Props) => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [code, setCode] = React.useState('');

  const [error, setError] = React.useState('');
  React.useEffect(() => {
    setError('');
    setCode('');
  }, [open])

  const handlePrepare = () => {
    setLoading(true);
    onRequest(code).then((res: any) => {
      setLoading(false);
      if (res.status === 0 && res.couponStatus === 'Normal') {
        onResult({
          ...res.couponInfo,
          discountCondition: res.discountCondition,
          discountQuota: res.discountQuota,
          discountValue: res.discountValue,
          couponFormula: res.couponFormula,
          orderAmountAfterDiscount: res.orderAmountAfterDiscount,
          couponStatus: res.couponStatus
        });
        onClose();
      } else {
        setError(res.couponMessage);
      }
    })
  }

  return (
    <Drawer anchor={"bottom"} open={open} onClose={onClose} className={classes.root}>
      <div className={classes.topContent}>
        <HighlightOff className={classes.topImg} onClick={onClose} />
      </div>
      <div className={classes.content}>
        <Typography className={classes.title}>使用优惠码</Typography>
        <TF label="请输入优惠码" onChange={(e) =>{setCode(e.target.value); setError('')}} fullWidth className={classes.tf} error={ Boolean(error) && error.length > 0} helperText={error}/>
        <Button disabled={loading || code.length === 0} variant={"contained"} color={"primary"} fullWidth className={classes.pay} onClick={handlePrepare}>
          <Typography style={{ position: 'absolute', fontSize: '14px' }}>确认</Typography>
          {loading &&
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute' }}>
              <CircularProgress size={20} />
            </div>
          }
        </Button>
      </div>
    </Drawer>
  );
}

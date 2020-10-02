import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import {Theme} from "@/components/theme";
import clsx from 'clsx';
import {useRouter} from 'next/router';
import {BASE_SERVICE_URL} from '@/env';
import {Order} from './index.d';
import PriceText from '@/components/text/price';
import AlipayIcon from '@/components/icons/alipay';
import WxpayIcon from '@/components/icons/wxpay';
import Box from '@material-ui/core/Box';
import {getJson} from '@fay-react/lib/fetch';
import PayTime from '@/components/text/pay-time';

interface Props{
  data: Order
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
    boxShadow: '0px 1px 0px 0px rgba(224,224,224,1)',
    marginBottom: theme.spacing(1.5),
    '& .MuiCardContent-root': {
      padding: theme.spacing(2, 1, 2, 2)
    },
  },
  status: {
    position: "absolute",
    right: theme.spacing(2),
    fontSize: '0.75rem',
    marginTop: theme.spacing(1)
  },
  name: {
    fontSize: '1rem',
    fontWeight: 500,
  },
  desc: {
    fontSize: '0.75rem',
    marginTop: theme.spacing(0.75),
  },
  detail: {
    display: "flex",
    fontSize: '0.75rem',
    marginTop: theme.spacing(2)
  },
  marginTopSpace1: {
    marginTop: theme.spacing(1)
  },
  font20: {
    fontSize: '1.25rem'
  },
  font12: {
    fontSize: '0.75rem'
  },
  payWidth: {
    width: 60
  },
  detailLeft: {
    width: '46%'
  },
  detailRight: {
    width: '54%'
  },
  cardActions: {
    width: '100%',
    padding: theme.spacing(2)
  },
  footer: {
    width: '100%',
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: '0.75rem',
  },
  orange: {
    color: theme.colors.orange
  },
  payMode: {
    display: "flex",
    alignItems: "center"
  }
}));

export default ({data}: Props) => {
  const classes: any = useStyles();
  const router = useRouter();
  const [innerData, setInnerData] = React.useState(data);
  const unPaid = innerData.status === 'UnPaid';

  const getData = () => {
    if (!data.orderId) return;
    getJson({ path: BASE_SERVICE_URL + `/order/detail/${data.orderId}` })
    .then((res: any) => {
      if (res.status === 0) {
        setInnerData(res.detail);
      }
    })
  }

  const handleClick = () => {
    router.push({
      pathname: router.pathname+'/detail',
      query: {
        id: data.orderId
      }
    });
  }

  return (
    <Card className={classes.root} elevation={0}>
      <CardActionArea onClick={handleClick}>
        <Typography className={classes.status} color={innerData.status === "UnPaid" ? "primary" : innerData.status === "Fail" ? "secondary" : innerData.status === "Paid" ? "textPrimary" : "textSecondary"}>
          {innerData.status === "UnPaid" ? '待付款' : innerData.status === "Fail" ? '支付失败' : innerData.status === 'Paid' ? '已完成' : '订单失效'}
        </Typography>
        <CardContent>
          <Typography className={classes.name}>
            {data.productName}
          </Typography>
          <div className={classes.detail}>
            <div className={classes.detailLeft}>
              <Typography className={classes.font12}>订单总额</Typography>
              <Box className={classes.font20} mt={0.5}>
                <PriceText value={data.payAmount}/>
              </Box>
            </div>
            <div className={classes.detailRight}>
              <Typography className={classes.font12}>数量：{data.orderUnits}T</Typography>
              <Box mt={1} className={classes.font12}>
                单价：<PriceText value={data.orderPricePerUnit}/> / TB
              </Box>
              <Box mt={1} className={classes.payMode}>
                <Typography className={clsx(classes.font12, classes.payWidth)}>支付方式:</Typography>
                {data.payMethod === 'WeChat'? unPaid ? <Box style={{display: 'flex'}}> <WxpayIcon style={{marginRight: 2, fontSize: '0.8rem'}}/> <Typography className={clsx(classes.font12)}>请在Web端支付</Typography> </Box>: <WxpayIcon fontSize={"small"}/> : <AlipayIcon fontSize={"small"}/>}
              </Box>
              
            </div>
          </div>
        </CardContent>
      </CardActionArea>
      {
        unPaid &&
        <CardActions className={classes.cardActions}>
          <div className={classes.footer}>
            <div>
              <Typography variant={"inherit"}>
                请在15分钟内完成支付：
              </Typography>
              <Typography variant={"inherit"} className={classes.orange}>
                <PayTime remainingTime={data.remainingPayTime} onTimeout={getData}/>
              </Typography>
            </div>
            <Button disabled={data.payMethod === 'WeChat' } variant={"contained"} size={"small"} color={"primary"} onClick={handleClick}>确认支付</Button>
            {/* {
              data.status === -1 && <Button variant={"contained"} size={"small"} color={"primary"}>重新发起</Button>
            } */}
          </div>
        </CardActions>
      }
    </Card>
  );
}

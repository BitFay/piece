import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Theme } from "@/components/theme";
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { Order } from '../index.d';
import moment from 'moment';
import AlipayIcon from '@/components/icons/alipay';
import WxpayIcon from '@/components/icons/wxpay';
import BankIcon from '@/components/icons/bank';
import PriceText from '@/components/text/price';
import Paper from "@material-ui/core/Paper";
import Box from '@material-ui/core/Box';
//@ts-ignore
import QRCode from 'qrcode.react';

interface Props {
  data: Order,
  qr?: string
}

interface Template {
  title?: string
  label?: string
  value?: any
  type?: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      fontWeight: 500
    },
    divider: {
      margin: theme.spacing(0.5, 0)
    },
    paper: {
      width: '100%',
      backgroundColor: theme.palette.grey[100],
      margin: theme.spacing(2, 0, 0, 1.5),
      padding: theme.spacing(2)
    },
    disOrg: {
      color: '#212121',
      fontSize: '0.875rem',
      textDecoration: 'line-through',
      marginTop: theme.spacing(1),
    },
    disNow: {
      textDecoration: 'inherit',
      marginTop: theme.spacing(0.5)
    },
    special: {
      color: theme.colors.deepGrey,
      fontSize: '0.75rem'
    },
    name: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    qr: {
      margin: theme.spacing(2, 0, 0, 2)
    }
  }),
);

export default ({ data, qr }: Props) => {
  const classes = useStyles()
  const WeChatpay = () => (data.status === 'UnPaid' ? <Box style={{ display: 'flex', justifyContent: 'flex-end' }}> <WxpayIcon fontSize={"small"} style={{ marginRight: 4 }} /> <Typography style={{ fontSize: '0.75rem', marginTop: '2px' }}>请在Web端支付</Typography> </Box> : <WxpayIcon fontSize={"small"} />)
  const template: Template[] = [{
    title: '合约信息'
  }, {
    label: '合约名称',
    value: data.productName
  }, {
    label: '币种',
    value: data.product.miningCoinType
  }, {
    label: '服务期限',
    value: data.product.productCycleDesc
  }, {
    label: '服务费',
    value: data.product.serviceFeeDesc
  }, {
    label: '收益结算周期',
    value: 'T+' + data.product.profitSettlementCycle
  }, {
    type: 'divider'
  }, {
    title: '算力信息'
  }, {
    label: '算力单价',
    value: data.orderPricePerUnit
  }, {
    label: '购买数量',
    value: data.orderUnits + ' TB'
  }, {
    type: 'divider'
  }, {
    title: '订单信息'
  }, {
    label: '订单号',
    value: data.orderId
  }, {
    label: '下单时间',
    value: moment(data.createdOn).format('YYYY-MM-DD HH:mm:ss')
  }, {
    type: 'divider'
  }, {
    title: '支付方式',
    value: data.payMethod === 'WeChat' ? <WeChatpay /> : data.payMethod === 'Bank' ? <BankIcon fontSize={"small"} /> : <AlipayIcon fontSize={"small"} />
  }, {
    type: 'divider'
  }, {
    type: 'discount'
  }];

  return (
    <div className={classes.root}>
      {
        data &&
        <Grid container spacing={1}>
          {
            template.map((item: any, index: number) => {
              return (
                <Grid key={index} container item xs={12} spacing={3}>
                  {
                    item.type ?
                      item.type === 'divider' ?
                        <Grid item xs={12}>
                          <Divider className={classes.divider} />
                        </Grid>
                        :
                        <Paper variant={"outlined"} className={classes.paper}>
                          <Typography className={classes.name} color={"secondary"}>
                            总价 <PriceText value={data.payAmount} />
                          </Typography>
                          {data.payAmount !== data.orderAmount ?
                            <>
                              <Typography className={classes.disOrg}>
                                原价：<PriceText value={data.orderAmount} />
                              </Typography>
                              <Typography className={classes.special}>
                                单价：<PriceText value={data.orderPricePerUnit} />/TB
                              </Typography>
                            </> : null}
                          {qr && qr !== '' ? <QRCode value={qr} size={100} fgColor="#000000" className={classes.qr}/> : null}
                        </Paper>
                      :
                      item.title ?
                        <>
                          <Grid item xs={4}>
                            <Typography className={classes.title}>{item.title}</Typography>
                          </Grid>
                          <Grid item xs={8}>
                            <Typography variant={"body2"} align={"right"}>{item.value}</Typography>
                          </Grid>
                        </>
                        :
                        <>
                          <Grid item xs={4}>
                            <Typography variant={"body2"} color={"textSecondary"}>{item.label}</Typography>
                          </Grid>
                          <Grid item xs={8}>
                            {item.label === '算力单价' ?
                              <Typography variant={"body2"} align={"right"}><PriceText value={item.value} />/TB</Typography> :
                              <Typography variant={"body2"} align={"right"}>{item.value}</Typography>
                            }
                          </Grid>
                        </>
                  }
                </Grid>
              )
            })
          }
        </Grid>
      }
    </div>
  );
}

import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

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
    }
  }),
);

const data: any = {
  contract: {
    name: "KeyPool云算力001期",
    coinType: "FileCoin",
    timeLimit: "180天",
    fee: "0",
    settlementCycle: "T+1"
  },
  ccpInfo: {
    price: '¥1500/TB',
    count: '20 TB'
  },
  order: {
    num: '202009162916',
    createDate: '2019-11-24 15:00:00'
  },
  payMode: "alipay"

}

const template = [{
  title: '合约信息'
},{
  label: '合约名称',
  key: "contract.name"
},{
  label: '币种',
  key: "contract.coinType"
},{
  label: '服务期限',
  key: "contract.timeLimit"
},{
  label: '服务费',
  key: "contract.fee"
},{
  label: '收益结算周期',
  key: "contract.settlementCycle"
},{
  type: 'divider'
},{
  title: '算力信息'
},{
  label: '算力单价',
  key: "ccpInfo.price"
},{
  label: '购买数量',
  key: "ccpInfo.count"
},{
  type: 'divider'
},{
  title: '订单信息'
},{
  label: '订单号',
  key: "order.num"
},{
  label: '下单时间',
  key: "order.createDate"
},{
  type: 'divider'
},{
  title: '支付方式',
  name: '支付宝'
},{
  type: 'divider'
}]

export default function NestedGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        {
          template.map((item, index) => {
            return (
              <Grid key={index} container item xs={12} spacing={3}>
                {
                  item.type ?
                  <Grid item xs={12}>
                    <Divider className={classes.divider}/>
                  </Grid>
                  :
                  item.title ?
                  <>
                    <Grid item xs={6}>
                      <Typography className={classes.title}>{item.title}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant={"body2"} align={"right"}>{item.name}</Typography>
                    </Grid>
                  </>
                  :
                  <>
                    <Grid item xs={6}>
                      <Typography variant={"body2"} color={"textSecondary"}>{item.label}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant={"body2"} align={"right"}>{item.key!.includes('.') ? data[item.key!.split('.')[0]][item.key!.split('.')[1]] : data[item.key!]}</Typography>
                    </Grid>
                  </>
                }
              </Grid>
            )
          })
        }
      </Grid>
    </div>
  );
}

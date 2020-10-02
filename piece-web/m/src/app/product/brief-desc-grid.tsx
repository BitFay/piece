import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { Product } from "@/app/product/index.d";
import { Theme } from "@/components/theme";

interface Props {
  data: Product,
  fee?: string
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: theme.palette.grey[100],
    height: 53,
    padding: theme.spacing(1)
  },
  item: {
    display: "inline-block",
    width: "25%",
  },
  itemContent: {
    display: 'flex'
  },
  left: {
    width: "20%",
  },
  normal: {
    width: "30%",
    paddingLeft: 0
  },
  label: {
    fontSize: '0.6875rem',
    color: theme.colors.deepGrey
  },
  value: {
    fontSize: '0.75rem',
    marginTop: theme.spacing(0.5)
  },
  borderLeft: {
    borderLeft: `1px solid ${theme.palette.grey[300]}`,
    paddingLeft: theme.spacing(1)
  },
  img: {
    width: 15,
    height: 15
  }
}));

export default ({ data, fee }: Props) => {
  const classes: any = useStyles();
  return (
    <div className={classes.root}>
      <div className={clsx(classes.item, classes.left)}>
        <Typography className={classes.label}>币种</Typography>
        <Typography className={classes.value}>{data.miningCoinType}</Typography>
      </div>
      <div className={clsx(classes.item, classes.borderLeft, classes.normal)}>
        <Typography className={classes.label}>收益结算周期</Typography>
        <Typography className={classes.value}>T+{data.profitSettlementCycle}</Typography>
      </div>
      <div className={clsx(classes.item, classes.borderLeft)}>
        <Typography className={classes.label}>服务期限</Typography>
        <Typography className={classes.value}>{data.productCycleDesc}</Typography>
      </div>
      <div className={clsx(classes.item, classes.borderLeft, classes.left)}>
        <Typography className={classes.label}>服务费</Typography>
        {fee ?
          <Typography className={classes.value}>{fee ? fee : '-'}</Typography>
          :
          <Typography className={classes.value}>{data.serviceFeeDesc}</Typography>
        }
      </div>
    </div>
  );
}

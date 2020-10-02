import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { Product } from "@/app/product/index.d";
import { Theme } from "@/components/theme";
import Empty from '@/components/icons/empty';

interface Props {
  className?: string
  data: Product
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: theme.palette.grey[100],
    // height: 53,
    padding: theme.spacing(1)
  },
  item: {
    display: "inline-block",
    width: "50%",
    padding: theme.spacing(1, 1, 1, 0)
  },
  label: {
    fontSize: '0.75rem',
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
  borderTop: {
    borderTop: `1px solid ${theme.palette.grey[300]}`,
    // paddingTop: theme.spacing(1.5)
  },
  itemContent: {
    display: 'flex',
    alignItems: 'center'
  },
  img: {
    width: 13,
    height: 13,
    color: '#757575',
    paddingBottom: '2px'
  }
}));

export default ({ className, data }: Props) => {
  const classes: any = useStyles();
  const helper = (e: any) => {
    alert('收益将在每个挖矿日结束1天内结算');
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  }
  const helperTime = (e: any) => {
    alert('用户享有云存储空间所有权');
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  }
  return (
    <div className={clsx(classes.root, className)}>
      <div className={classes.item}>
        <Typography className={classes.label}>币种</Typography>
        <Typography className={classes.value}>{data.miningCoinType}</Typography>
      </div>
      <div className={clsx(classes.item, classes.borderLeft)}>
        <div className={classes.itemContent} onClick={helper}>
          <Typography className={classes.label}>收益结算周期</Typography>
          <Empty className={classes.img} />
        </div>
        <Typography className={classes.value}>T+{data.profitSettlementCycle}</Typography>
      </div>
      <div className={clsx(classes.item, classes.borderTop)}>
        <div className={classes.itemContent} onClick={helperTime}>
          <Typography className={classes.label}>服务期限</Typography>
          <Empty className={classes.img} />
        </div>
        <Typography className={classes.value}>{data.productCycleDesc}</Typography>
      </div>
      <div className={clsx(classes.item, classes.borderLeft, classes.borderTop)}>
        <Typography className={classes.label}>服务费</Typography>
        <Typography className={classes.value}>{data.serviceFeeDesc}</Typography>
      </div>
    </div>
  );
}

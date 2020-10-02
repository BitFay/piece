import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import { Theme } from '@/components/theme';
import Box from '@material-ui/core/Box';
import { useRouter } from 'next/router';
import moment from 'moment';
import { splitNumber } from '@/app/personal/capital/number-fixed';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: 'calc(100vh - 40px)',
    backgroundColor: '#FFFFFF'
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 500,
    margin: theme.spacing(0, 2, 2.5),
    padding: theme.spacing(2.5, 0),
    borderBottom: '1px solid #E0E0E0',
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(1.5, 2)
  },
  front: {
    color: theme.colors.deepGrey,
    fontSize: '0.875rem'
  },
  des: {
    color: '#212121',
    fontSize: '0.875rem',
    wordBreak: 'break-all'
  }
}));

export default () => {
  const classes = useStyles();
  const router = useRouter();
  let item: any;
  item = router.query.item;
  item = item && JSON.parse(item);

  const typeDes = (type: string) => {
    switch (type) {
      case 'MiningIncome':
        return '挖矿收入';
      case 'MiningFeeIncome':
        return '服务费返还';
      case 'Withdraw':
        return '转出'
      default:
        return '-';
    }
  }

  const infoDes = (type: string, info: string) => {
    let s = '';
    if (info) s = '（'+ info + '）'
    switch (type) {
      case 'WaitAudit':
        return `处理中${s}`;
      case 'Success':
        return `成功${s}`;
      case 'Reject':
        return `失败${s}`;
      default:
        return '-';
    }
  }

  return (
    <div className={classes.root}>
      <Typography className={classes.title}>{item?.jnlType === 'Withdraw' ? '-' : '+'}{splitNumber(item?.number)}FIL</Typography>
      <Box className={classes.content}>
        <Typography className={classes.front}>类型</Typography>
        <Typography className={classes.des}>{typeDes(item?.jnlType)}</Typography>
      </Box>
      <Box className={classes.content}>
        <Typography className={classes.front}>信息</Typography>
        <Box width={200} display={'flex'} justifyContent={'flex-end'}>
          <Typography className={classes.des}>{item?.jnlType === 'Withdraw' ? infoDes(item?.status, item?.info) : (item?.info ? item?.info : '-')}</Typography>
        </Box>
      </Box>
      <Box className={classes.content}>
        <Typography className={classes.front}>时间</Typography>
        <Typography className={classes.des}>{moment(item?.createdOn).format('YYYY-MM-DD HH:mm:ss')}</Typography>
      </Box>
    </div>
  )
}
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center"
  },
  content: {
    padding: theme.spacing(2)
  },
  title: {
    // padding: theme.spacing(1, 0),
    fontWeight: "bold",
    fontSize: '1rem',
    color: '#212121'
  },
  des: {
    fontSize: '0.875rem',
    color: '#212121'
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Typography className={classes.title}>关于Keystore</Typography>
        <Box mt={2.5}>
          <Typography className={classes.des}>
            KeystoreGroup成立于2018年，是亚太地区领先的加密资产服务商，为机构客户提供银行级别的加密资产存管和网银支付服务，共服务超过百家知名投资机构、交易所、项目方和矿业公司，旗下产品包括Keystore Internet Banking、KeystoreCustody、KeyPay、KeyPool等。2020年1月，Keystore获得了建元基金和分布式资本的投资，正式成为业内唯一国资背景的企业级加密资产服务商。
          </Typography>
        </Box>
      </div>
    </div>
  );
};

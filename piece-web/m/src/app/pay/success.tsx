import React from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Theme} from "@/components/theme";
import Router from 'next/router';
import {PATH_PREFIX} from '@/env';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    textAlign: "center",
    paddingTop: '20%'
  },
  icon: {
    color: theme.colors.green,
    fontSize: '3.5rem'
  },
  textPrimary: {
    fontWeight: 500,
    margin: theme.spacing(3.75, 0, 1, 0)
  },
  buttons: {
    marginTop: theme.spacing(5)
  },
  buyBtn: {
    marginLeft: theme.spacing(2)
  }
}));

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CheckCircleIcon className={classes.icon}/>
      <Typography variant={"h5"} className={classes.textPrimary}>支付完成</Typography>
      <Typography variant={"inherit"} color={"textSecondary"}>XXXXXXXXXXXXXXXXXX</Typography>
      <div className={classes.buttons}>
        <Button variant={"contained"} color={"primary"} onClick={() => Router.push(`${PATH_PREFIX}/personal/order`)}>查看订单</Button>
        <Button variant={"outlined"} color={"primary"} className={classes.buyBtn} onClick={() => Router.push(`${PATH_PREFIX}/ccp`)}>继续购买</Button>
      </div>
    </div>
  )
}
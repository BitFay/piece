import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import clsx from "clsx";
// import Drawer from './pay/drawer-code';
import {Product} from "@/app/product/index.d";
import PriceText from '@/components/text/price';
import Router from 'next/router';
import { PATH_PREFIX } from '@/env';

interface Props {
  data: Product
  className?: string
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: 48,
    position: 'fixed',
    bottom: 0,
    padding: theme.spacing(0, 2),
    background: theme.palette.common.white,
    display: "flex",
    justifyContent: "space-between",
    alignItems: 'center',
    boxShadow: '0px -1px 0px 0px rgba(224,224,224,1)'
  },
  price: {
    fontWeight: 500
  }
}));

export default ({className, data}: Props) => {
  const classes = useStyles();
  // const [state, setState] = React.useState({open: false});

  // const toggleDrawer = (open: boolean) => (
  //   event: React.KeyboardEvent | React.MouseEvent,
  // ) => {
  //   if (
  //     event.type === 'keydown' &&
  //     ((event as React.KeyboardEvent).key === 'Tab' ||
  //     (event as React.KeyboardEvent).key === 'Shift')
  //   ) {
  //     return;
  //   }
  //   setState({ ...state, open });
  // };
  const orderMoney = () => {
    Router.push({
      pathname: PATH_PREFIX + "/contract/pay",
      query: {
        id: data.id
      }
    })
  }

  return (
    <div className={clsx(classes.root, className)}>
      <Typography color={"secondary"} className={classes.price}><PriceText value={data.pricePerUnit}/> / TB</Typography>
      <Button disabled={data.remainingUnits === 0} variant={"contained"} color={"primary"} onClick={orderMoney}>立即购买</Button>
      {/* <Drawer data={data} open={state.open} onClose={toggleDrawer(false)}/> */}
    </div>
  );
};

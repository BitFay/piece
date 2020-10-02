import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from './card';
import { Contract } from '../../contract/index.d';
import { getJson } from '@fay-react/lib/fetch';
import { BASE_SERVICE_URL } from '@/env';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Drawer from './give-code';
import { Contxt } from './ctx';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    paddingTop: theme.spacing(2.5),
    paddingBottom: theme.spacing(2.75),
    display: 'flex',
    justifyContent: 'center',
  },
  content: {
    width: '100%',
  },
}));

export default () => {
  const classes = useStyles();
  const [data, setData] = React.useState<Contract[]>([]);
  const [open, setOpen] = React.useState(false);
  const [productId, setProductId] = React.useState('');
  const [serviceFee, setServiceFee] = React.useState('');
  const Ctx: any = React.useContext(Contxt);

  const toggleDrawer = (open: boolean, id: any, fee: any) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setOpen(open);
    setProductId(id);
    setServiceFee(fee);
  };
  const getData = () => getJson({ path: BASE_SERVICE_URL + '/hold/list' }).then(res => {
    if (res.status === 0) {
      setData(res.record);
    }
  })

  React.useEffect(() => {
    getData();
    Ctx?.state && Ctx?.state.value !== 0 && setOpen(true);
  }, [Ctx?.state.value])

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        {
          data.length ? data.map((item, i) => {
            return (
              <Card key={i} data={item} fee={item.serviceFeeDesc} drawerFuc={toggleDrawer(true, item.product.id, item.serviceFee)} />
            )
          }) : <Box textAlign='center'><Typography>暂无数据</Typography></Box>
        }
      </div>
      <Drawer open={open} onClose={toggleDrawer(false, '', '')} id={productId} serviceFee={serviceFee}/>
    </div>
  );
};

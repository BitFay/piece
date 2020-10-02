import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from './card';
import {BASE_SERVICE_URL} from '@/env';
import {getJson} from '@fay-react/lib/fetch';
import {Order} from './index.d';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

interface Props{
  status?: 'UnPaid' | 'Paid' | 'Fail'
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    paddingTop: theme.spacing(2.5),
    // paddingBottom: theme.spacing(2.5),
    display: 'flex',
    justifyContent: 'center',
  },
  content: {
    width: '100%',
  },
}));

export default ({status}: Props) => {
  const classes = useStyles();

  const [data, setData] = React.useState<Order[]>([]);

  React.useEffect(() => {
    getJson({ path: BASE_SERVICE_URL + '/order/list' })
      .then((resp: any) => {
        if (resp.status === 0) {
          if(status){
            setData(resp.records.filter((data: Order) => data.status === status));
          }else{
            setData(resp.records);
          }
        }
      })
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        {
          data.length ? data.map((item, i) => {
            return (
              <Card key={i} data={item}/>
            )
          }) : <Box textAlign='center'><Typography>暂无数据</Typography></Box>
        }
      </div>
    </div>
  );
};

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@/app/product/card';
import {getJson} from '@fay-react/lib/fetch';
import {BASE_SERVICE_URL} from '@/env';
import {Product} from '@/app/product/index.d';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    paddingTop: theme.spacing(2.75),
    paddingBottom: theme.spacing(2.75),
    display: 'flex',
    justifyContent: 'center',
  },
  content: {
    width: 'calc(100% - 32px)',
  },
}));

export default () => {
  const classes = useStyles();
  const [productList, setProductList] = React.useState<Product[]>([]);

  React.useEffect(() => {
    getJson({path: BASE_SERVICE_URL+'/no-auth/product/list'}).then((res) => {
      if(res.status === 0){
        let list = [];
        if (res.records.length > 2) {
          list = [res.records[0], res.records[1], res.records[2]];
        } else {
          list = [...res.records];
        }
        setProductList(list);
      }else{
        // error
      }
    })
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        {
          productList.length === 0 ?
          <Skeleton variant="rect" height={198} animation="wave"/>
          :
          productList.map((item, i) => {
            return (
              <Card key={i} data={item}/>
            )
          })
        }
      </div>
    </div>
  );
};

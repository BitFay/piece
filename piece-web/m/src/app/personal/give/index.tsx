import React from 'react';
import Banner from './banner';
import Services from './services';
import {makeStyles} from "@material-ui/core/styles";
import {getJson} from '@fay-react/lib/fetch';
import {BASE_SERVICE_URL} from '@/env';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: '#FAFAFA',
  },
}));

export default () => {
  const classes = useStyles();
  const [total, setTotal] = React.useState<number>(0);

  React.useEffect(() => {
    getJson({ path: BASE_SERVICE_URL + '/hold/transfer/list', data: {pageNum: 1, pageSize: 10} }).then(res => {
      if (res.status === 0) {
        setTotal(res.totalTransfer);
      }
    })
  }, []);

  return (
    <div className={classes.root}>
      <Banner total={total} />
      <Services />
    </div>
  )
}
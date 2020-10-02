import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from './card';
import { Contract } from '../../contract/index.d';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import InfiniteScroll from 'react-infinite-scroll-component';
import { BASE_SERVICE_URL } from '@/env';
import { getJson } from '@fay-react/lib/fetch';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    paddingTop: theme.spacing(2.75),
    paddingBottom: theme.spacing(2.75),
    display: 'flex',
    justifyContent: 'center',
  },
  content: {
    width: '100%',
    backgroundColor: '#FAFAFA',
  },
}));

export default () => {
  const classes = useStyles();
  const [data, setData] = React.useState<Contract[]>([]);
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 10;
  const [num, setNum] = React.useState(0);

  React.useEffect(() => {
    getData();
  }, []);
  const getData = (pageNum = page + 1, pageSize = rowsPerPage) => {
    getJson({ path: BASE_SERVICE_URL + '/hold/transfer/list',  data: {pageNum, pageSize} }).then(res => {
      if (res.status === 0) {
        setData(res.list.records);
        pageNum === 1 ? setData(res.list.records) : setData([...data,...res.list.records]);
        setNum(res.list.total);
        setPage(pageNum);
      }
    })
  }

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <InfiniteScroll
          dataLength={data.length}
          next={() => getData()}
          hasMore={data.length <= num}
          loader={<></>}
        >
          {
            data.length ? data.map((item: any, i) => {
              let transfer = undefined;
              if (item.targetUserName) {
                transfer = {
                  targetUserName: item.targetUserName,
                  totalMiningFeeIncome: item.totalMiningFeeIncome,
                  transferDate: item.transferDate,
                  transferUnit: item.transferUnit,
                }
              }
              return (
                <Card key={i} data={item} transfer={transfer} />
              )
            }) : <Box textAlign='center'><Typography>暂无数据</Typography></Box>
          }

        </InfiniteScroll>
      </div>
    </div>
  );
};

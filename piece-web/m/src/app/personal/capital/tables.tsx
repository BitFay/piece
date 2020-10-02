import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@/components/theme';
import Typography from '@material-ui/core/Typography';
// import List from '@material-ui/core/List';
import { useRouter } from 'next/router';
import { postJson } from '@fay-react/lib/fetch';
import { PATH_PREFIX, BASE_SERVICE_URL } from '@/env';
import { Contxt } from './ctx';
import TypeSelect from './select';
import { splitNumber } from '@/app/personal/capital/number-fixed';
import Box from '@material-ui/core/Box';
import clsx from 'clsx';
import InfiniteScroll from 'react-infinite-scroll-component';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(3)
  },
  title: {
    fontSize: '0.75rem',
    color: theme.colors.deepGrey,
    fontWeight: 500
  },
  content: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(1.5, 2),
    borderBottom: '1px solid #E0E0E0',
    backgroundColor: '#FFFFFF'
  },
  contentOver: {
    borderBottom: 'none'
  },
  txt: {
    fontSize: '0.875rem',
    color: '#212121'
  },
  typeContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: theme.spacing(0, 2)
  },
  more: {
    width: '100%',
    height: 50
  }
}))

export default () => {
  const classes = useStyles();
  const router = useRouter();

  const ctx: any = React.useContext(Contxt);
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 10;
  const [num, setNum] = React.useState(0);
  const [type, setType] = React.useState('All');
  const [data, setData] = React.useState<any[]>([]);
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
  const getData = (type: string, pageNum = page + 1, pageSize = rowsPerPage) => {
    setType(type);
    postJson({ path: BASE_SERVICE_URL + `/asset/tradeJnl/${type}`, data: { pageNum, pageSize } })
      .then((resp: any) => {
        if (resp.status === 0) {
          pageNum === 1 ? setData(resp.records) : setData([...data,...resp.records]);
          setPage(pageNum);
          setNum(resp.total);
        }
      })
  }
  React.useEffect(() => {
    getData(type, 1, rowsPerPage);
  }, [ctx?.state.value])
  return (
    <div className={classes.root}>
      <div className={classes.typeContent}>
        <Typography className={classes.title}>资产明细</Typography>
        <TypeSelect onChange={(t: any) => getData(t, 1, rowsPerPage)} />
      </div>
      <InfiniteScroll
        dataLength={data.length}
        next={() => getData(type)}
        hasMore={data.length <= num}
        loader={<></>}
        >
        {
          data.length ? data.map((item: any, index) => {
            return (
              <React.Fragment key={index}>
                <div className={clsx(classes.content, { [classes.contentOver]: index === data.length - 1 })} onClick={() => router.push({ pathname: PATH_PREFIX + '/personal/capital/detail', query: { item: JSON.stringify(item) } })}>
                  <Typography className={classes.txt}>{typeDes(item.jnlType)}</Typography>
                  <Typography className={classes.txt}>{item.jnlType === 'Withdraw' ? '-' : '+'}{splitNumber(item?.number)} &nbsp;FIL</Typography>
                </div>
              </React.Fragment>
            )
          }) : <Box mt={1} display={'flex'} justifyContent={'center'}><Typography className={classes.txt}>暂无数据</Typography></Box>
        }
      </InfiniteScroll>
      <div className={classes.more} />
    </div>
  )
}
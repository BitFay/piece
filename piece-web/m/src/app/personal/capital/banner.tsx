import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@/components/theme';
import Typography from '@material-ui/core/Typography';
import { PATH_PREFIX, BASE_SERVICE_URL } from '@/env';
import LoopIcon from '@material-ui/icons/Loop';
import Box from '@material-ui/core/Box';
import { getJson } from '@fay-react/lib/fetch';
import Button from '@material-ui/core/Button';
import Drawer from './capital-code';
import { Contxt } from './ctx';
import { CSSTransition } from 'react-transition-group';
import Empty from '@/components/icons/empty';
import { splitNumber } from '@/app/personal/capital/number-fixed';
import moment from 'moment';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    // borderTop: '1px solid rgba(255, 255, 255, 0.24)',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    width: '100%',
    height: 120,
    background: `url('${PATH_PREFIX}/static/banner/1.png') no-repeat center`,
    backgroundSize: 'cover',
    backgroundColor: '#131313',
    color: theme.palette.common.white,
    paddingTop: "20px"
  },
  box: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: theme.spacing(0, 2)
  },
  boxTxt: {
    fontSize: '0.75rem',
    fontWeight: 500
  },
  boxImg: {
    width: 20,
    cursor: 'pointer',
    color: '#FFFFFF'
  },
  title: {
    fontWeight: 500,
    fontSize: '1.5rem',
    margin: theme.spacing(0.5, 2, 0)
  },
  des: {
    fontSize: '0.875rem',
    margin: theme.spacing(0, 0, 0, 2)
  },
  bottom: {
    display: 'flex',
    height: 72,
    backgroundColor: '#FFFFFF'
  },
  bottomContent: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  bottomTitle: {
    color: theme.colors.deepGrey,
    fontSize: '0.75rem'
  },
  bottomDes: {
    color: '#212121',
    fontSize: '0.75rem'
  },
  bottomBtn: {
    width: '100%',
    height: 48,
    position: 'fixed',
    bottom: 0,
    padding: theme.spacing(0.5, 2),
    background: theme.palette.common.white,
    display: "flex",
    boxShadow: '0px -1px 0px 0px rgba(224,224,224,1)',
    zIndex: 10
  },
  cssBtn: {
    position: 'relative',
    minWidth: 40,
    height: 21
  },
  totalUSDT: {
    display: 'flex',
    alignItems: 'center'
  },
  labelImg: {
    width: 15,
    height: 15,
    marginLeft: theme.spacing(0.5),
    paddingTop: '2px',
  },
  custom: {
    padding: 10,
  }
}));

const list = [{
  txt: '昨日收益（FIL）',
  num: ''
},
{
  txt: '累计收益（FIL）',
  num: ''
},
{
  txt: '昨日收益（FIL）',
  num: ''
}];
export default () => {
  const classes = useStyles();
  const [asset, setAsset] = React.useState<any>(undefined);
  const [data, setData] = React.useState<any>(list);
  const [limit, setLimit] = React.useState<any>();
  const [animate, setAnimate] = React.useState(false);
  const ctx: any = React.useContext(Contxt);

  const getData = () => {
    getJson({ path: BASE_SERVICE_URL + '/asset/overview' }).then((res: any) => {
      if (res.status === 0) {
        setAsset(res);
        setData([
          {
            txt: '昨日收益（FIL）',
            num: res.lastIncome
          },
          {
            txt: '累计收益（FIL）',
            num: res.totalIncome
          },
          {
            txt: '我的算力（TB）',
            num: res.totalHold
          }
        ]);
      }
    })
  }

  const getLimit = () => {
    getJson({ path: BASE_SERVICE_URL + '/no-auth/asset/withdrawConfig/Filecoin' }).then((res: any) => {
      if (res.status === 0) {
        setLimit(res.list)
      }
    })
  }

  React.useEffect(() => {
    getData(); getLimit()
  }, [ctx?.state.value]);
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setOpen(open);
  };
  const requestClick = () => {
    if (!animate) {
      setAnimate(true);
      ctx.dispatch({ type: "Change", payload: {} })
      setTimeout(() => {
        setAnimate(false);
      }, 1000);
    }
  }

  const t = () => {
    const b = new Date().getTime() - 1000 * 24 * 3600;
    const s = moment(b).format('MM-DD');
    const d = new Date().getTime();
    const f = moment(d).format('MM-DD');
    return `${s} 2:00 am 至 ${f} 2:00 am 产生的挖矿收益`
  }

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Box className={classes.box}>
          <Typography className={classes.boxTxt}>总资产</Typography>
          <Button onClick={requestClick} className={classes.cssBtn}>
            <CSSTransition
              in={animate}
              unmountOnExit
              timeout={500}
              onEnter={(e: any) => e.style.transform = 'rotate(0)'}
              onEntering={
                (e: any) => {
                  e.style.transform = `rotate(-360deg)`,
                    e.style.transition = `transform 500ms`
                }
              }>
              <LoopIcon className={classes.boxImg} style={{ position: 'absolute' }} />
            </CSSTransition>
            {!animate ? <LoopIcon className={classes.boxImg} style={{ position: 'absolute' }} /> : null}
          </Button>
        </Box>
        <Typography className={classes.title}>{splitNumber(asset?.totalAsset)}&nbsp;FIL</Typography>
        <Box className={classes.totalUSDT}>
          <Typography className={classes.des}>≈ {splitNumber(asset?.totalAssetOfUSD)}&nbsp;USDT</Typography>
          <div style={{ display: 'inline-block' }} onClick={() => alert('对价信息来自CoinMarketCap.com')}>
            <Empty className={classes.labelImg} />
          </div>
        </Box>
      </div>
      <div className={classes.bottom}>
        {data.map((item: any, idx: any) => (
          <Box key={idx} className={classes.bottomContent}>
            <Box display={'flex'}>
              <Typography className={classes.bottomTitle}>{item.txt}</Typography>
              {idx === 0 &&
                <div style={{ display: 'inline-block', marginLeft: '-10px' }} onClick={() => alert(t())}>
                  <Empty className={classes.labelImg} />
                </div>
              }
            </Box>
            <Typography className={classes.bottomDes}>{idx < 2 ? splitNumber(item.num) : item.num}</Typography>
          </Box>
        ))}
      </div>
      <div className={classes.bottomBtn}>
        <Button fullWidth variant={"contained"} color={"primary"} onClick={toggleDrawer(true)}>转出</Button>
      </div>
      <Drawer open={open} onClose={toggleDrawer(false)} data={asset} limit={limit} onResult={() => { ctx.dispatch({ type: "Change", payload: {} }) }} />
    </div>
  );
};

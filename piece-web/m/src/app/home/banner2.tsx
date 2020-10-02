import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {PATH_PREFIX} from '@/env';
// import Top from '@/app/home/top';

const height = 160;

const useStyles = makeStyles((theme) => ({
  root: {
    height,
    background: `url('${PATH_PREFIX}/static/home/banner/2.png') no-repeat center`,
    backgroundSize: 'cover',
    color: theme.palette.common.white,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  titleCon: {
    marginLeft: theme.spacing(2)
  },
  btn: {
    padding: 0,
    marginTop: theme.spacing(1.5),
    color: theme.palette.common.white,
  }
}));

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.titleCon}>
        <img src={`${PATH_PREFIX}/static/home/banner/2-1.png`} width={240}/>
        <br/>
        <Button onClick={() => {window.open('https://news.sina.com.cn/o/2020-08-21/doc-iivhuipn9894212.shtml')}} className={classes.btn}>点击了解更多展会信息 &gt; </Button>
      </div>
    </div>
  );
};

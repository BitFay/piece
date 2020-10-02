import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
// import Top from '@/app/home/top';
import { PATH_PREFIX } from '@/env';

const height = 160;

const useStyles = makeStyles((theme) => ({
  root: {
    height,
    background: `url('${PATH_PREFIX}/static/banner/1.png') no-repeat center`,
    backgroundSize: 'cover',
    color: theme.palette.common.white,
    width: '100%',
    paddingTop: theme.spacing(4),
    display: 'flex',
    justifyContent: 'space-between'
  },
  titleCon: {
    marginLeft: theme.spacing(2)
  },
  title1: {
    fontSize: '1.5rem',
    fontWeight: 'bold'
  },
  title2: {
    marginTop: theme.spacing(1),
    fontSize: '0.875rem',
    color: 'rgba(255,255,255,0.7)'
  },
  img: {
    width: 100,
    height: 100,
    margin: theme.spacing(0, 2, 0, 1.5)
  }
}));

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.titleCon}>
        <Typography variant={"body2"} align={"left"} className={classes.title1}>KeyPool: Get </Typography>
        <Typography variant={"body2"} align={"left"} className={classes.title1}>Filecoin with Ease</Typography>
        <Typography variant={"body2"} align={"left"} className={classes.title2}>轻松入场，抢占Filecoin头矿福利</Typography>
      </div>
      <img src={`${PATH_PREFIX}/static/home/1-5.png`} className={classes.img} />
    </div>
  );
};

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
// import {PATH_PREFIX} from '@/env';

const height = 100;

const useStyles = makeStyles((theme) => ({
  root: {
    height,
    // background: `url('${PATH_PREFIX}/banner/bg.png') no-repeat fixed center`,
    // backgroundSize: 'cover'
    backgroundColor:theme.palette.common.black
  },
  content: {
    height,
    color: theme.palette.common.white,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Typography>欢迎来到KeyPool帮助中心</Typography>
      </div>
    </div>
  );
};

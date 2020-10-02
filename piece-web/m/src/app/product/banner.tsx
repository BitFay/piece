import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {PATH_PREFIX} from '@/env';

const height = 113;

const useStyles = makeStyles(() => ({
  root: {
    height,
    background: `url('${PATH_PREFIX}/static/banner/1.png') no-repeat center`,
    backgroundSize: 'cover'
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
    </div>
  );
};

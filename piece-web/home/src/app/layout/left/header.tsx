import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import {PATH_PREFIX} from '@/env';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center'
    },
    img: {
      width: 150,
      height: 67,
    }
  })
);

interface Props {
  open: boolean
}

export default ({open}: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {open && <img src={PATH_PREFIX+'/static/layout/logo.png'} className={classes.img}/>}
    </div>
  );
}
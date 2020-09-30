import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Content from './content';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%'
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Content/>
    </div>
  )
}
import React from 'react';
import Tabs from './tabs';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {

  },
}));

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Tabs/>
    </div>
  )
}
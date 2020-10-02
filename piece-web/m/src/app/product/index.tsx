import React from 'react';
import Banner from './banner';
import List from './list';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {

  },
}));

export default () => {
  const classes = useStyles();

  return (
  <div className={classes.root}>
    <Banner/>
    <List/>
  </div>
  )
}
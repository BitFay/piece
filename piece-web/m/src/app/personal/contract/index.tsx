import React from 'react';
import Banner from './banner';
import Services from './services';
import { makeStyles } from "@material-ui/core/styles";
import { ContxtProvider } from './ctx';

const useStyles = makeStyles(() => ({
  root: {

  },
}));

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ContxtProvider>
        <Banner />
        <Services />
      </ContxtProvider>
    </div>
  )
}
import React from 'react';
import Banner from './banner';
import Tables from './tables';
import { makeStyles } from "@material-ui/core/styles";
import { ContxtProvider } from './ctx';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: '#FAFAFA'
  },
}));

export default () => {
  const classes = useStyles();
  return (
    <div className={classes.root} >
      <ContxtProvider>
        <Banner />
        <Tables />
      </ContxtProvider>
    </div>
  )
}
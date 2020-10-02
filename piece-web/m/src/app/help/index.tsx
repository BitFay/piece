import React from 'react';
import Banner from './banner';
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Navigation from './navigation';
import News from './news';
import NoviceGuide from './novice-guide';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: '#FAFAFA'
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Banner />
      <Navigation />
      <News />
      <Box mt={2} pb={2}>
        <NoviceGuide />
      </Box>
    </div>
  )
}
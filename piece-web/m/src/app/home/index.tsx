import React from 'react';
import List from './list';
import {makeStyles} from "@material-ui/core/styles";
import WhatIs from './whatIs';
import WhyChose from './whyChose';
import Investment from './investment';
import Partner from './partner';
import Notify from './notify';
import Num from './num';
import Swiper from './swiper';

const useStyles = makeStyles(() => ({
  root: {
    overflow: 'hidden'
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Swiper/>
      <Notify />
      <List/>
      <WhatIs/>
      <WhyChose/>
      <Investment/>
      <Partner/>
      <Num />
    </div>
  )
}
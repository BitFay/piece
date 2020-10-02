import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from './bottom-navigation';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    position: "fixed",
    bottom: 0,
    zIndex: 6
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <BottomNavigation/>
    </div>
  );
};

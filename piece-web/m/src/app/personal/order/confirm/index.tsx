import React from 'react';
import Services from './services';
import {makeStyles} from "@material-ui/core/styles";
import Detail from "./detail";
import {Theme} from "@/components/theme";

const useStyles = makeStyles((theme: Theme) => ({
  root: {

  },
  content: {
    padding: theme.spacing(2),
    position: 'absolute',
    bottom: 109,
    top: 40,
    overflow: 'auto'
  }
}));

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Detail/>
      </div>
      <Services/>
    </div>
  )
}
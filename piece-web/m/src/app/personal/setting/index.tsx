import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import List from "./list";
import {Theme} from "@/components/theme";
import Logout from "./logout";

const useStyles = makeStyles((theme: Theme) => ({
  root: {

  },
  content: {
    padding: theme.spacing(2,0)
  }
}));

export default () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <List/>
        <Logout/>
      </div>
    </div>
  )
}
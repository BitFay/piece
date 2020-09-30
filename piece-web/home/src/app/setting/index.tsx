import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Search from './search';
import Content from './content';
import Add from './add';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  content: {
    marginTop: theme.spacing(3)
  }
}));

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Search/>
      <Content className={classes.content}/>
      <Add/>
    </div>
  )
}
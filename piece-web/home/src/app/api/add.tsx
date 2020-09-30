import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import clsx from 'clsx';
import AddButton from '@/components/button/add';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%'
  },
}));

export default ({className}: any) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      <AddButton onClick={() => {}}/>
    </div>
  )
}
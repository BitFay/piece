import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import {PATH_PREFIX} from '@/env';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  img: {
    width: 80,
    margin: theme.spacing(2)
  }
}));

const data = [{
  type: 'DOC',
},{
  type: 'XLS',
},{
  type: 'PIC',
},{
  type: 'PIC',
},{
  type: 'PIC',
},{
  type: 'PDF',
},{
  type: 'PDF',
},{
  type: 'PDF',
},{
  type: 'PDF',
}]

export default ({className}: any) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      {
        data.map((item, index) => {
          return (
            <Button key={index}>
              <img src={PATH_PREFIX+'/static/file/'+item.type+'.png'} className={classes.img}/>
            </Button>
          )
        })
      }
    </div>
  )
}
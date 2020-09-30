import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {PATH_PREFIX} from '@/env';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    textAlign: 'center',
    height: 'calc(100vh - 192px)',
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
  },
  img: {
    width: 100,
    marginTop: 200
  },
  bold: {
    fontWeight: 'bold'
  }
}));

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img src={PATH_PREFIX+'/static/coming-soon/client.png'} className={classes.img}/>
      <Box mt={2}>
        <Typography>This feature is only supported on the client.</Typography>
      </Box>
      <Box mt={1}>
        <Typography className={classes.bold}>coming soon</Typography>
      </Box>
    </div>
  )
}
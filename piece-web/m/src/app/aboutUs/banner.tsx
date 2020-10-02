import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { PATH_PREFIX } from '@/env';

const height = 110;

const useStyles = makeStyles((theme) => ({
  root: {
    height,
    background: `url('${PATH_PREFIX}/static/banner/1.png') no-repeat center`,
    backgroundSize: 'cover',
    backgroundColor: '#131313',
    borderTop: '1px solid rgba(255, 255, 255, 0.24)',
    display: 'flex',
    justifyContent: 'center'
  },
  content: {
    color: theme.palette.common.white,
    paddingTop: "20px"
  },
  title: {
    fontWeight: "bold",
    fontSize: '1.5rem',
    textAlign: "center"
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Typography className={classes.title}>KeyPool</Typography>
        <Typography className={classes.title}>Filecoin云存储服务商</Typography>
      </div>
    </div>
  );
};

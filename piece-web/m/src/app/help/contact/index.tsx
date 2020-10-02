import React from 'react';
import { makeStyles, Theme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Smartphone from '@material-ui/icons/Smartphone';
import MailOutline from '@material-ui/icons/MailOutline';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(2,2)
  },
  content: {
    display: 'flex',
  },
  img: {
    marginRight: '8px'
  }
}));

export default () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Box mt={1} >
        <Typography>
          如果您对产品有任何疑问，欢迎联络我们，我们的团队将会尽快为您解答疑问。
        </Typography>
      </Box>
      <Box mt={1}>
        <Typography>
          工作时间：周一至周五9:30~18:30
        </Typography>
      </Box>
      <Box mt={1}>
        <Typography className={classes.content}>
          <Smartphone className={classes.img} /> 400-820-3960
        </Typography>
      </Box>
      <Box mt={1}>
        <Typography className={classes.content}>
          <MailOutline className={classes.img} /> support@keypool.com
        </Typography>
      </Box>
    </div>
  )
}

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@/components/theme';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: '#FAFAFA',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: '0.75rem',
    color: theme.colors.deepGrey,
    cursor: 'pointer'
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant={"inherit"} className={classes.title} onClick={() => window.open('http://www.beian.miit.gov.cn/')}>琼ICP备20002004号-1</Typography>
    </div>
  )
};

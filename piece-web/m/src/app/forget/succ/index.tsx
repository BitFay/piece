import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@/components/theme';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded'
import { grey } from '@material-ui/core/colors';
import Router from 'next/router';
import { PATH_PREFIX } from '@/env';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  img: {
    width: 60,
    height: 60,
    color: '#0CC73B',
    marginTop: theme.spacing(11.5)
  },
  head: {
    fontWeight: 500,
    color: grey[900],
    fontSize: '1.5rem',
    margin: theme.spacing(3.75, 0, 1, 0)
  },
  des: {
    color: grey[600],
    marginBottom: theme.spacing(6)
  },
  skip: {
    width: 120,
    height: 40,
    borderRadius: 28,
    border: '1px solid #263BE0',
    color: '#263BE0',
    fontSize: '1rem',
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  }
}))

export default () => {
  const classes = useStyles({});
  const [time, setTime] = React.useState('3s')
  React.useEffect(() => {
    let showtime = 3;
      const timer = setInterval(() => {
        if (showtime <= 1) {
          setTime('1s');
          clearInterval(timer);
          handleLogin();
          setTime('0s');
        } else {
          showtime--;
          setTime(showtime+'s');
        }
      }, 1000)
      return () => {clearInterval(timer)};
  },[])
  const handleLogin = () => Router.push(PATH_PREFIX + '/login');
  return (
    <div className={classes.root}>
      <CheckCircleRoundedIcon className={classes.img}/>
      <div className={classes.head}>密码修改成功</div>
      <div className={classes.des}>{`马上跳转至登录页面(${time})`}</div>
      <div onClick={handleLogin} className={classes.skip}>跳过</div>
    </div>
  )
}
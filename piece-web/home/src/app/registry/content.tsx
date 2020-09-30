import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {PATH_PREFIX, BASE_URL} from '@/env';
import clsx from 'clsx';
import {useRouter} from 'next/router';
import {postJson} from '@fay-react/lib/fetch';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    minHeight: '100vh',
    background: theme.palette.primary.main,
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    color: theme.palette.common.white,
    paddingTop: theme.spacing(6)
  },
  logo: {
    width: 300
  },
  typography: {
    width: 360
  },
  paper: {
    width: 400,
    textAlign: 'center',
    marginTop: theme.spacing(4),
    padding: theme.spacing(3),
  },
  peopleImg: {
    width: 100,
  },
  login: {
    width: 450
  },
  loginBtnWrapper: {
    position: 'relative',
  },
  buttonProgress:{
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  }
}));

export default ({className}: any) => {
  const classes = useStyles();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [data, setData] = React.useState({username: '', password: ''});

  const registry = () => {
    setSuccess(false);
    setError(false);
    setLoading(true);
    postJson({path: BASE_URL+'/users/signup', data}).then(res => {
      setLoading(false);
      if((res.status && res.status !== 200) || res.error){
        setError(true);
      }else{
        setSuccess(true);
      }
    })
  }

  const handleChange = (key: string) => (e: any) => {
    setData({...data, [key]: e.target.value});
  }

  const goToLogin = () => {
    router.push(PATH_PREFIX+'/login');
  }

  return (
    <div className={clsx(classes.root, className)}>
      <img src={PATH_PREFIX+'/static/login/logo.png'} className={classes.logo}/>
      <Paper className={classes.paper}>
        <img src={PATH_PREFIX+'/static/login/people.png'} className={classes.peopleImg}/>
        <Box mt={2}>
          <TextField label={'username'} fullWidth value={data.username} onChange={handleChange('username')}/>
        </Box>
        <Box mt={2}>
          <TextField label={'password'} type={'password'} fullWidth value={data.password} onChange={handleChange('password')}/>
        </Box>
        <Box mt={6} className={classes.loginBtnWrapper}>
          {
            error &&
            <Box mt={1} mb={1}>
              <Typography color={"secondary"}>Register has failed!</Typography>
            </Box>
          }
          {
            success &&
            <Box mt={1} mb={1}>
              <Typography color={"primary"}>Register was successful!</Typography>
            </Box>
          }
          <Button disabled={loading} fullWidth variant={"contained"} color={'primary'} onClick={registry}>Register</Button>
          {loading && !error && <CircularProgress color={"primary"} size={24} className={classes.buttonProgress} />}
        </Box>
        <Box mt={2}>
          <Button fullWidth color={'primary'} onClick={goToLogin}>Login</Button>
        </Box>
      </Paper>
    </div>
  )
}
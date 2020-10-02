import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LogoIcon from '@/components/icons/logo/logo1';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Router, {useRouter} from 'next/router';
import { PATH_PREFIX } from '@/env';
import Typography from '@material-ui/core/Typography';

const height = 40;

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    top: 0,
    zIndex: 100,
    width: '100%',
    height,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.common.white,
    background: theme.palette.common.black,
    boxShadow: '0px 1px 0px 0px rgba(255,255,255,0.24)',
    padding: '0 32px'
  },
  back: {
    position: 'absolute',
    left: 0
  },
  right: {
    position: 'absolute',
    right: 0
  },
  homeIcon: {
    width: 104,
    height: 26
  },
  homeText: {
    marginLeft: '5px',
    marginTop: '3px',
    fontSize: '1rem',
    fontWeight: 'bold'
  },
  title: {
    fontWeight: 500,
    fontSize: '1rem'
  }
}));

export default ({left, right, rightTxt, rightFuc, centerTxt}: any) => {
  const classes = useStyles();
  const router = useRouter();
  const pathname = router.pathname;
  const jumpHome = () => {
    if (router.pathname === PATH_PREFIX) return;
    router.push(PATH_PREFIX + '/');
  }

  const back = React.useCallback(() => {
    const backList = {
      [PATH_PREFIX+'/personal/order']: PATH_PREFIX+'/personal',
      [PATH_PREFIX+'/personal/capital']: PATH_PREFIX+'/personal',
      [PATH_PREFIX+'/personal/contract/give']: PATH_PREFIX+'/personal/contract',
      [PATH_PREFIX+'/personal/contract']: PATH_PREFIX+'/personal',
    };
    const backTarget = backList[pathname];
    if(backTarget) {
      Router.replace(backTarget);
    }else{
      Router.back()
    }
  }, [pathname]);

  return (
    <div className={classes.root}>
      {
        left &&
        <div className={classes.back}>
          <Button color={"inherit"} onClick={back}>
            <ArrowBackIcon/>
          </Button>
        </div>
      }
      {
        centerTxt ? <Typography className={classes.title}> {centerTxt}</Typography> : <LogoIcon onClick={jumpHome} className={classes.homeIcon}/>
      }
      {right && (
        <div className={classes.right}>
          <Button color={"inherit"} onClick={rightFuc}>
            {rightTxt}
          </Button>
        </div>
      )}
    </div>
  );
};

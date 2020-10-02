import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {Theme} from "@/components/theme";
import Router from 'next/router';
import {removeUser} from '@fay-react/lib/user';
import {remove as removeCookie} from '@fay-react/lib/cookie';
import {getJson} from '@fay-react/lib/fetch';
import {BASE_SERVICE_URL, BASE_URL, PATH_PREFIX} from '@/env';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing(2)
  },
}));

export default () => {
  const classes = useStyles();

  const handleLogout = () => {
    getJson({path: BASE_SERVICE_URL+'/logout'});
    getJson({path: BASE_URL+'/logout'});
    removeUser();
    removeCookie("OAUTH2SESSION", {path: '/'});
    removeCookie("JSESSIONID", {path: '/'});
    Router.replace(PATH_PREFIX+'/personal/');
  }

  return (
    <div className={classes.root}>
      <Button color={"default"} variant={"contained"} fullWidth onClick={handleLogout} disableElevation>退出登录</Button>
    </div>
  )
}
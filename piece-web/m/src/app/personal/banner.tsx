import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import Router from 'next/router';
import { User } from '../user';
import Button from '@material-ui/core/Button';
import { getJson } from '@fay-react/lib/fetch';
import { BASE_SERVICE_URL, PATH_PREFIX, BASE_URL } from '@/env';
import { saveUser, getUser } from '@fay-react/lib/user';

interface Props {
  user?: User | null
}

const height = 140;

const useStyles = makeStyles((theme) => ({
  root: {
    height,
    background: `url('${PATH_PREFIX}/static/banner/1.png') no-repeat fixed center`,
    backgroundSize: 'cover',
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    width: '100%',
    paddingTop: theme.spacing(3.25),

  },
  content: {
    height: 50,
    display: "flex",
    alignItems: "center",
  },
  left: {
    marginLeft: theme.spacing(2.5)
  },
  right: {
    marginLeft: theme.spacing(2)
  },
  avatar: {
    backgroundColor: theme.palette.common.white
  },
  loginOrRegisterBtn: {
    padding: 0,
    color: theme.palette.common.white
  },
  title1: {
    fontSize: '1rem',
    fontWeight: 'bold'
  },
  title2: {
    marginTop: theme.spacing(1),
    fontSize: '0.75rem'
  },
}));

export default ({ user }: Props) => {
  const classes = useStyles();
  const [total, setTotal] = React.useState<number>(0);

  const handleGoToLogin = () => {
    Router.push({
      pathname: `${PATH_PREFIX}/login`,
      query: { redirectUrl: Router.pathname },
    })
  }

  React.useEffect(() => {
    user && getJson({ path: BASE_SERVICE_URL + '/hold/total' }).then(res => {
      if (res.status === 0) {
        setTotal(res.total);
        userInfo();
      }
    })
  }, [JSON.stringify(user)]);

  const userInfo = async () => {
    const userLocal = getUser();
    const res = await getJson({ path: BASE_URL + '/getCurrentUserInfo' });
    if (res.status === 0 && res.userInfo) {
      const currentLocal = { ...res.userInfo, name: res.loginAccount };
      saveUser(currentLocal);
      if (JSON.stringify(userLocal) !== JSON.stringify(currentLocal)) Router.reload();
      return true
    }
    return false;
  }

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div className={classes.left} onClick={user ? () => { } : handleGoToLogin}>
          <Avatar className={classes.avatar}>
            <PersonIcon color={'disabled'} />
          </Avatar>
        </div>
        <div className={classes.right}>
          {
            user ?
              <>
                <Typography variant={"body2"} className={classes.title1}>{user.name || user.email || user.mobileNo}</Typography>
                <Typography variant={"body2"} className={classes.title2}>总算力：{total}TB</Typography>
              </>
              :
              <>
                <Button className={classes.loginOrRegisterBtn} size={"large"} onClick={handleGoToLogin}>登录/注册</Button>
                <Typography variant={"body2"} className={classes.title2}>总算力：--</Typography>
              </>
          }

        </div>
      </div>
    </div>
  );
};

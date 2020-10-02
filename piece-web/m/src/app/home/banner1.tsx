import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {PATH_PREFIX, BASE_SERVICE_URL} from '@/env';
import {getJson} from '@fay-react/lib/fetch';
// import Top from '@/app/home/top';
import {useRouter} from 'next/router';

const height = 160;

const useStyles = makeStyles((theme) => ({
  root: {
    height,
    background: `url('${PATH_PREFIX}/static/home/banner/1.png') no-repeat center`,
    backgroundSize: 'cover',
    color: theme.palette.common.white,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  titleCon: {
    marginLeft: theme.spacing(2)
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold'
  },
  btn: {
    padding: 0,
    marginTop: theme.spacing(1.5),
    color: theme.palette.common.white,
  }
}));

export default () => {
  const classes = useStyles();
  const router = useRouter();

  const goBuyPage = () => {
    getJson({path: BASE_SERVICE_URL+'/no-auth/product/list'}).then((res) => {
      console.log(res);
      if(res.status === 0){
        router.push({
          pathname: PATH_PREFIX + '/contract',
          query: { id: res.records[0].id },
        })
      }else{
        // error
      }
    })
  }

  return (
    <div className={classes.root}>
      <div className={classes.titleCon}>
        <Typography variant={"body2"} align={"left"} className={classes.title}>Getting Ready for</Typography>
        <Typography variant={"body2"} align={"left"} className={classes.title}>Space Race</Typography>
        <Button onClick={goBuyPage} className={classes.btn}>即刻加入KeyPool，分享太空竞赛丰厚奖励 &gt; </Button>
      </div>
    </div>
  );
};

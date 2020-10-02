import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import FilterIcon from '@material-ui/icons/Filter';
import ExploreIcon from '@material-ui/icons/ExploreOutlined';
import HeadsetMicIcon from '@material-ui/icons/HeadsetMic';
import Grid from '@material-ui/core/Grid';
import { useRouter } from 'next/router';
// import {PATH_PREFIX} from '@/env';

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    padding: theme.spacing(4),
    textAlign: "center",
    zoom: 0.5
  },
  content: {
    color: theme.palette.common.white,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardArea: {
    zoom: 2,
    padding: theme.spacing(1.5, 0),
    // '&:after': {
    //   content: '""',
    //   display: 'block',
    //   position: 'absolute',
    //   left: '-50%',
    //   width: '200%',
    //   height: '1px',
    //   background: '#ededed',
    //   transform:'scale(0.5)'
    // }
  },
  typography: {
    marginTop: theme.spacing(0.75),
    fontSize: '0.875rem'
  }
}));

const data = [{
  icon: FilterIcon,
  text: '资讯动态',
  path: '/news'
}, {
  icon: ExploreIcon,
  text: '新手引导',
  path: '/novice-guide'
}, {
  icon: HeadsetMicIcon,
  text: '联系我们',
  path: '/contact'
}]

export default () => {
  const classes = useStyles();
  const router = useRouter();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {
          data.map((item, index) => {
            const Icon = item.icon;
            return (
              <Grid key={index} item xs={4} onClick={() => router.push(router.pathname+ item.path)}>
                <Card variant={"outlined"}>
                  <CardActionArea className={classes.cardArea}>
                    <Icon />
                    <Typography className={classes.typography}>{item.text}</Typography>
                  </CardActionArea>
                </Card>
              </Grid>
            )
          })
        }
      </Grid>
    </div>
  );
};

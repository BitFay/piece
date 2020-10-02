import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ChevronRight from '@material-ui/icons/ChevronRight';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { useRouter } from 'next/router';
import { PATH_PREFIX } from '@/env';
import OrderIcon from '@/components/icons/order';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    imgContent: {
      minWidth: 30,
    },
    img: {
      width: 20,
      height: 20,
    },
    txt: {
      fontSize: '0.875rem',
    },
    middle: {
      width: '100%',
      height: theme.spacing(2),
      backgroundColor: '#FAFAFA'
    }
  }),
);

const data = [
  {
    startIcon: OrderIcon,
    text: "我的订单",
    path: '/personal/order'
  },
  {
    startIcon: SettingsApplicationsIcon,
    text: "账户设置",
    path: '/personal/setting'
  }, {
    startIcon: AccountBoxIcon,
    text: "关于我们",
    path: '/aboutUs'
  }
]

export default function InsetList() {
  const classes = useStyles();
  const router = useRouter();

  return (
    <List component="nav" className={classes.root}>
      {
        data.map((item, index) => {
          const StartIcon = item.startIcon;
          return (
            <div key={index + 10}>
              {index === 1 ? <div className={classes.middle} /> : null}
              <ListItem button onClick={() => router.push(PATH_PREFIX + item.path)}>
                <ListItemIcon classes={{ root: classes.imgContent }}>
                  <StartIcon className={classes.img} />
                </ListItemIcon>
                <ListItemText primary={item.text} classes={{ primary: classes.txt }} />
                <ListItemSecondaryAction onClick={() => router.push(PATH_PREFIX + item.path)}>
                  <IconButton edge="end">
                    <ChevronRight />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </div>
          )
        })
      }
    </List>
  );
}

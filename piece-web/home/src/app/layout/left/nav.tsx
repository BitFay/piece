import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import icons from './icons';
import clsx from 'clsx';
import {PATH_PREFIX} from "@/env";
import {useRouter} from 'next/router';

interface Data {
  icon: string,
  text: string,
  pathname: string
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
    },
    item:{
      width: 'calc(100% - 16px)',
      margin: theme.spacing(1, 0, 1, 2),
      // color: theme.palette.grey[500],
      '&:hover,&:focus': {
        color: theme.palette.common.white,
        background: theme.palette.primary.main,
      },
      paddingLeft: theme.spacing(1),
      borderRadius: '3px 0 0 3px'
    },
    icon: {
      minWidth: 35,
      color: 'inherit',
    },
    selected: {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.main,
      borderRight: `2px solid ${theme.palette.primary.main}`
    },
    selectedText: {
      fontWeight: 'bolder'
    }
  })
);

const data = [
  {
    "icon": "dashboard",
    "text": "All files",
    "pathname": ""
  },
  {
    "icon": "enhancedEncryption",
    "text": "Encrypted files",
    "pathname": "/encrypted-files"
  },
  {
    "icon": "share",
    "text": "Content Market",
    "pathname": "/content-market"
  },
  {
    "icon": "pets",
    "text": "API",
    "pathname": "/api"
  },
  {
    "icon": "setting",
    "text": "Setting",
    "pathname": "/setting"
  },
];

export default ({className, onLeftNavClick}: any) => {
  const classes = useStyles();
  const router = useRouter();

  const handleClick = (pathname: string) => {
    onLeftNavClick();
    router.push(PATH_PREFIX+pathname);
  }

  return (
    <List component="nav" dense className={className}>
      {
        data.map((item: Data, i: number) => {
          console.log(PATH_PREFIX+item.pathname, router.pathname);
          const selected = PATH_PREFIX+item.pathname === router.pathname;
          return (
            <ListItem button key={i} className={clsx(classes.item, {[classes.selected]: selected})} onClick={() => handleClick(item.pathname)}>
              <ListItemIcon className={classes.icon} >
                {icons[item.icon]}
              </ListItemIcon>
              <ListItemText primary={item.text} primaryTypographyProps={{className: clsx({[classes.selectedText]: selected})}}/>
            </ListItem>
          )
        })
      }
    </List>
  );
}
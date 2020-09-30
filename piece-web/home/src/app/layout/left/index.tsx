import React from 'react';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import Header from './header';
import Nav from './nav';
import Drawer from '@material-ui/core/Drawer';
import clsx from 'clsx';
import Telescopic from './telescopic';

const drawerWidth = 208;

const useStyles = makeStyles((theme) =>
  createStyles({
    drawer: {
      height: '100%',
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxShadow: '0 3px 7px 3px rgba(0,0,0,0.12)',
    },
    drawerPaper:{
      paddingTop: theme.spacing(7.75),
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      overflowX: 'hidden',
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: 69,
      '& .MuiListItemIcon-root': {
        marginRight: theme.spacing(1.25)
      }
    },
    nav: {
      marginTop: theme.spacing(2)
    },
    telescopic: {
      position: 'absolute',
      bottom: 120,
      right: 34,
      color: 'red'
    },
    expired: {
      position: 'absolute',
      bottom: '32px',
      left: '20px',
      color: theme.palette.grey[400]
    },
    versionTime: {
      position: 'absolute',
      bottom: '8px',
      left: '36px',
      color: theme.palette.grey[400],
      fontSize: '0.75rem'
    }
  }),
);
interface Props {
  open: boolean,
  handleDrawer: (event: any) => void
  onLeftNavClick: Function
}

export default function TypographyMenu({open, handleDrawer, onLeftNavClick}: Props) {
  const classes = useStyles();
  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx(classes.drawerPaper, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
      open={open}
    >
      <Header open={open}/>
      <Nav className={classes.nav} onLeftNavClick={onLeftNavClick}/>
      <Telescopic className={classes.telescopic} direction={open?'left':'right'} onClick={handleDrawer}/>
    </Drawer>
  );
}
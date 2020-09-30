import React from 'react';
import Left from './left';
import {makeStyles, createStyles} from "@material-ui/core/styles";
import Header from './header';
import clsx from 'clsx';

const useStyles = makeStyles((theme) =>
  createStyles({
    left: {
      display: 'inline-block',
      height: 'calc(100% - 10px)'
    },
    right: {
      float: 'right',
      height: '100%',
      backgroundColor: '#F3F5F8',
      padding: theme.spacing(0, 3.375),
      minHeight: '100vh'
    },
    rightInset: {
      width: 'calc(100% - 208px)',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    rightOut: {
      width: 'calc(100% - 69px)',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    rightHeader: {
      height: 56,
      width: '100%',
    },
    rightFull: {
      width: '100%'
    },
    rightContent: {
      height: 'calc(100% - 56px)',
      width: '100%',
      paddingTop: theme.spacing(5),
      overflow: 'auto',
      '&::-webkit-scrollbar': {
        display: 'none'
      }
    },
    rightPaper: {
      display: 'inline-block',
      width: '100%',
    }
  })
);

export default ({children, left=true}: any) => {
  const classes = useStyles();

  const [navClickNum, setNavClickNum] = React.useState(0);

  const [open, setOpen] = React.useState(true);
  const handleDrawer = () => {
    setOpen(!open);
  };

  const handleLeftNavClick = () => {
    setNavClickNum(navClickNum+1);
  }

  React.useEffect(() => {
    
  }, []);

  return (
    <>
      {
        left &&
        <div className={classes.left}>
          <Left open={open} handleDrawer={handleDrawer} onLeftNavClick={handleLeftNavClick}/>
        </div>
      }
      <div className={clsx(classes.right, {[classes.rightInset]: open}, {[classes.rightOut]: !open}, {[classes.rightFull]: !left})}>
        <div className={classes.rightHeader}>
          <Header/>
        </div>
        <div className={classes.rightContent} key={navClickNum}>
          {children}
        </div>
      </div>
    </>
  )
}
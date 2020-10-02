import React from 'react';
// import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Link from '@material-ui/core/Link';
import Desc from './privacy';
import { Theme } from '@/components/theme';
import Typography from '@material-ui/core/Typography';

interface Props{
  text: string
}

const height = 40;

const useStyles = makeStyles((theme: Theme) => ({
  header: {
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
  close: {
    position: "fixed",
    minWidth: "32px",
    padding: 0
  },
  content: {
    // width: 500,
    padding: theme.spacing(4)
  },
}));

export default ({text}: Props) => {
  const classes = useStyles();
  const handleContract = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setOpen(true);
  }
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }
    setOpen(open);
  };

  return (
    <>
      <Link onClick={handleContract}>{text}</Link>
      <Drawer anchor={"bottom"} open={open} onClose={toggleDrawer(false)}>
        <div className={classes.header}>
          <div className={classes.back}>
            <Button color={"inherit"} onClick={toggleDrawer(false)}>
              <CloseIcon/>
            </Button>
          </div>
          <Typography>隐私协议详情</Typography>
        </div>
        <div className={classes.content}>
          <Desc/>
        </div>
      </Drawer>
    </>
  );
}

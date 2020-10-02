import React from 'react';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const useStyles = makeStyles(() => ({
  root: {

  },
  btn: {
    color: '#212121',
    fontSize: '0.75rem',
    minWidth: 80,
    justifyContent: 'flex-end'
  },
  paper: {
    zIndex: 10,
    width: 80
  },
  font: {
    fontSize: '0.75rem',
  }
}));

export default ({ onChange }: any) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const [typeTxt, setTypeTxt] = React.useState('全部');
  const handleClick = (type: string) => () => {
    let s = ''
    if (type === 'Income') {
      s = '收入';
    }else if (type === 'Withdraw') {
      s = '转出'
    } else {
      s = '全部'
    }
    setTypeTxt(s);
    setOpen(false);
    onChange && onChange(type);
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event: React.MouseEvent<EventTarget>, _path?: string) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }
    prevOpen.current = open;
  }, [open]);
  return (
    <>
      <Button
        className={classes.btn}
        ref={anchorRef}
        aria-controls={open ? 'menu-list-type' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        endIcon={<ExpandMoreIcon />}
      >
        {typeTxt}
      </Button>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal className={classes.paper}>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'right top' : 'right bottom' }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-type" onKeyDown={handleListKeyDown}>
                  <MenuItem onClick={handleClick('All')} className={classes.font}>全部</MenuItem>
                  <MenuItem onClick={handleClick('Income')} className={classes.font}>收入</MenuItem>
                  <MenuItem onClick={handleClick('Withdraw')} className={classes.font}>转出</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
}
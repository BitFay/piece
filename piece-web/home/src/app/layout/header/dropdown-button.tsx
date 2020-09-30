import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import {Theme} from '@/components/theme';
import IconButton from '@material-ui/core/IconButton';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
    },
    iconBtn: {

    },
    dropdown: {
      position: 'absolute',
      top: 48,
      right: 0,
      zIndex: 1,
    },
  })
);


export default ({children, dropdownComponent}: any) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className={classes.root}>
        <IconButton className={classes.iconBtn} type="button" onClick={handleClick}>
          {children}
        </IconButton>
        {open && dropdownComponent ? (
          <div className={classes.dropdown}>
            {dropdownComponent}
          </div>
        ) : null}
      </div>
    </ClickAwayListener>
  );
}
import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Cid from './cid';

const useStyles = makeStyles((theme) => ({
  btn: {
    backgroundColor: theme.palette.primary.light
  },
}));

const ITEM_HEIGHT = 48;

export default ({data, img}: any) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [cidOpen, setCidOpen] = React.useState(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickCidOpen = () => {
    setCidOpen(true);
  };

  const handleCidClose = () => {
    setCidOpen(false);
  };

  return (
    <>
      <IconButton
        size={"small"}
        color={"primary"}
        onClick={handleClick}
        className={classes.btn}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
          <MenuItem onClick={handleClickCidOpen}>
            View cid
          </MenuItem>
          <MenuItem onClick={handleClose}>
            Share
          </MenuItem>
      </Menu>
      <Cid data={data} img={img} onClose={handleCidClose} open={cidOpen}/>
    </>
  );
}

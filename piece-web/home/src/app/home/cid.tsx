import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography } from '@material-ui/core';
import {datetimeFormat} from '@/lib/date-format';
import ClipboardJS from 'clipboard';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Tooltip from '@material-ui/core/Tooltip';
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  title: {
    display: 'flex',
    alignItems: 'center'
  },
  bold: {
    fontWeight: 'bold'
  },
  img: {
    width: 80,
    margin: theme.spacing(0.5)
  },
  actions: {
    justifyContent: 'center'
  },
  content: {
    padding: theme.spacing(1, 4)
  }
}));

export default ({img, data, onClose, open}: any) => {
  const classes = useStyles();
  const [copyOpen, setCopyOpen] = React.useState(false);
  
  const handleTooltipClose = () => {
    setCopyOpen(false);
  };

  const handleTooltipOpen = () => {
    setCopyOpen(true);
  };

  React.useEffect(() => {
    const clipboard = new ClipboardJS('.copyBtn');
    return () => {
      clipboard.destroy();
    }
  }, []);

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle id="alert-dialog-title">
        <Box mt={2.5} className={classes.title}>
          <Box>
            <img src={img} className={classes.img}/>
          </Box>
          <Box ml={2}>
            <Typography className={classes.bold}>{data.filename}</Typography>
            <Typography>upload on {datetimeFormat(data.updated_at)}</Typography>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent className={classes.content}>
        <Box>
          <Typography className={classes.bold}>CID:</Typography>
          <Typography id="copyVal">{data.cid}</Typography>
        </Box>
      </DialogContent>
      <DialogActions className={classes.actions}>
        <ClickAwayListener onClickAway={handleTooltipClose}>
            <div>
              <Tooltip
                PopperProps={{
                  disablePortal: true,
                }}
                onClose={handleTooltipClose}
                open={copyOpen}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title={'Copied'}
              >
                <Button
                  onClick={handleTooltipOpen}
                  className={'copyBtn'}
                  data-clipboard-target={'#copyVal'}
                  color="primary"
                  size="large"
                  style={{fontSize:12}}
                >
                  Copy CID
                </Button>
              </Tooltip>
            </div>
        </ClickAwayListener>
      </DialogActions>
    </Dialog>
  );
}

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import { Theme } from "@/components/theme";
import Button from "@material-ui/core/Button";
import HighlightOff from '@material-ui/icons/HighlightOff';

interface Props {
  open: boolean
  des: string|undefined
  onClose: any
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .MuiDrawer-paperAnchorBottom': {
      borderRadius: '16px 16px 0px 0px'
    }
  },
  content: {
    padding: theme.spacing(0, 2, 2.5, 2)
  },
  title: {
    color: '#212121',
    fontSize: '1.25rem',
    fontWeight: 500
  },
  des: {
    color: '#757575',
    fontSize: '0.875rem',
    margin: theme.spacing(1, 0, 5.5, 0)
  },
  pay: {
    height: 48
  },
  topContent: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '5px 5px 0 0'
  },
  topImg: {
    width: 20,
    height: 20
  },
  tf: {
    width: '100%',
    margin: theme.spacing(4, 0, 5.5)
  }
}));

export default ({ open, des, onClose }: Props) => {
  const classes = useStyles();

  return (
    <Drawer anchor={"bottom"} open={open} onClose={onClose} className={classes.root}>
      <div className={classes.topContent}>
        <HighlightOff className={classes.topImg} onClick={onClose}/>
      </div>
      <div className={classes.content}>
        <Typography className={classes.title}>优惠详情:</Typography>
        <Typography className={classes.des}>{des ? des : '-'}</Typography>
        <Button variant={"contained"} color={"primary"} fullWidth className={classes.pay} onClick={onClose}>
          <Typography style={{ position: 'absolute', fontSize: '14px' }}>确认</Typography>
        </Button>
      </div>
    </Drawer>
  );
}

import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import {Theme} from '@/components/theme';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import {PATH_PREFIX, BASE_URL} from '@/env';
import {useRouter} from 'next/router';
import {removeUser, getUser} from '@fay-react/lib/user';
import ClipboardJS from 'clipboard';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Tooltip from '@material-ui/core/Tooltip';
import FileCopyIcon from '@material-ui/icons/FileCopy';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3),
      width: 350,
    },
    peopleImg: {
      width: 80
    },
    filecoinImg: {
      width: 28
    },
    address: {
      wordBreak: 'break-all'
    },
    bold: {
      fontWeight: 'bold'
    },
    balance: {
      display: 'flex',
      alignItems: 'center'
    }
  })
);


export default () => {
  const classes = useStyles();
  const router = useRouter();
  const [data, setData] = React.useState<any>(null);
  const [open, setOpen] = React.useState(false);

  const handleLogout = () => {
    removeUser();
    router.push(PATH_PREFIX+'/login');
  }

  const getData = async () => {
    try {
      const fetchRes = await fetch(BASE_URL+'/users', {
        method: 'GET',
        // body: {
        //   q: ''
        // },
        headers: {
          'Authorization': getUser().token
        }
      });
      const result = await fetchRes.json();
      console.log(result);
      if(!result.error){
        setData(result.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  React.useEffect(() => {
    getData();
    const clipboard = new ClipboardJS('.copyBtn');
    return () => {
      clipboard.destroy();
    }
  }, []);

  return (
    <Paper className={classes.root}>
      <Box style={{textAlign: 'center'}}>
        <img src={PATH_PREFIX+'/static/layout/people.png'} className={classes.peopleImg}/>
      </Box>
      <Box mt={2} className={classes.balance}>
        <img src={PATH_PREFIX+'/static/layout/filecoin-logo.svg'} className={classes.filecoinImg}/>
        <Typography style={{fontSize: '1rem', marginLeft: '20px'}} className={classes.bold}>{data && data.wallet_balance} fil</Typography>
      </Box>
      <Box mt={2}>
        <Typography className={classes.bold}>Your Filecoin Testnet address</Typography>
      </Box>
      <Box mt={2}>
        <Typography className={classes.address} variant={"inherit"} id="copyVal">{data && data.wallet_address}</Typography>
      </Box>
      <Box mt={2}>
        <ClickAwayListener onClickAway={handleTooltipClose}>
            <div>
              <Tooltip
                PopperProps={{
                  disablePortal: true,
                }}
                onClose={handleTooltipClose}
                open={open}
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
                  size="small"
                  startIcon={<FileCopyIcon />}
                  style={{fontSize:12}}
                >
                  Copy address
                </Button>
              </Tooltip>
            </div>
        </ClickAwayListener>
      </Box>
      <Box mt={3}>
        <Button fullWidth onClick={handleLogout} color={'secondary'}>Logout</Button>
      </Box>
    </Paper>
  );
}
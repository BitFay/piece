import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import {Theme} from '@/components/theme';
import Typography from '@material-ui/core/Typography';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PersonIcon from '@material-ui/icons/Person';
import StorageIcon from '@material-ui/icons/Storage';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import DropdownButton from './dropdown-button';
import Personal from './personal';
import Miners from './miners';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      height: '100%',
      '-webkit-app-region': 'drag',
      borderBottom: `1px solid ${theme.palette.grey[300]}`,
      justifyContent: 'space-between',
      alignItems: 'center',
      marginRight: `-${theme.spacing(1)}px`,
    },
    right: {
      display: 'flex',
      height: '100%',
      alignItems: "center",
      '-webkit-app-region': 'no-drag',
    },
  })
);


export default () => {
  const classes = useStyles();
  const [miner, setMiner] = React.useState<string|null>(null);

  const handleChangeMiner = (name: string) => {
    setMiner(name);
  }

  return (
    <div className={classes.root}>
      <div/>
      <div className={classes.right}>
        <DropdownButton
          dropdownComponent={
            <Miners value={miner} onChange={handleChangeMiner}/>
          }
        >
          <StorageIcon />
          <Typography>&nbsp;{miner?miner:'Choose miners'}</Typography>
          <ArrowDropDownIcon/>
        </DropdownButton>
        <DropdownButton>
          <NotificationsIcon />
        </DropdownButton>
        <DropdownButton
          dropdownComponent={
            <Personal/>
          }
        >
          <PersonIcon />
        </DropdownButton>
      </div>
    </div>
  );
}
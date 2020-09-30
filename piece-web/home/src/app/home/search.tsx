import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    search: {
      width: '100%',
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      height: 32,
      marginLeft: '5px',
      marginRight: '5px',
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
      fontSize: '14px'
    },
    iconButton: {
      padding: 4,
      color: theme.palette.grey[500]
    },
    icon: {
      fontSize: '20px'
    },
  }),
);

export default ({onChange}: any) => {
  const classes = useStyles();

  const [value, setValue] = React.useState('');

  const handleSearch = (_value: string) => {
    onChange(_value)
  };

  const handleKeyUp = (e: any) => {
    if(e.keyCode === 13) handleSearch(value);
  };

  const handleReset = () => {
    setValue('');
    handleSearch('');
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.search} elevation={0}>
        <IconButton className={classes.iconButton} onClick={() => handleSearch(value)}>
          <SearchIcon className={classes.icon}/>
        </IconButton>
        <InputBase
          placeholder={'Search for file name or cid'}
          value={value}
          className={classes.input}
          onChange={(e) => setValue(e.target.value)}
          onKeyUp={handleKeyUp}
        />
        {
          value.length > 0 &&
          <IconButton className={classes.iconButton} onClick={handleReset}>
            <CloseIcon className={classes.icon}/>
          </IconButton>
        }
      </Paper>
    </div>
  );
}
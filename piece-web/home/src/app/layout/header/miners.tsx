import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import {Theme} from '@/components/theme';
import Paper from '@material-ui/core/Paper';
import {BASE_URL} from '@/env';
import {getUser} from '@fay-react/lib/user';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(1)
    },
    text: {
      width: 150
    }
  })
);


export default ({value, onChange}: any) => {
  const classes = useStyles();
  const [data, setData] = React.useState([]);

  // const [checked, setChecked] = React.useState([1]);

  const getData = async () => {
    try {
      const fetchRes = await fetch(BASE_URL+'/miners', {
        method: 'GET',
        headers: {
          'Authorization': getUser().token
        }
      });
      const result = await fetchRes.json();
      console.log(result);
      if(!result.error){
        setData(result);
      }
    } catch (error) {
      console.error(error);
    }
  }


  React.useEffect(() => {
    getData();
  }, []);

  return (
    <Paper className={classes.root}>
      <List dense className={classes.root}>
        {data.map((item, index) => {
          return (
            <ListItem key={index} button onClick={() => onChange(item)}>
              <ListItemText primary={<Typography className={classes.text}>{`Miner ${item}`}</Typography>} />
              <ListItemSecondaryAction>
                <Checkbox
                  edge="end"
                  // onChange={handleToggle(value)}
                  checked={item===value}
                />
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
}
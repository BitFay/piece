import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from 'next/link';
import {PATH_PREFIX} from "@/env";
import Router from 'next/router';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    padding: theme.spacing(0, 2, 1.5, 2),
    background: theme.palette.common.white,
  },
  content: {
    // paddingBottom: theme.spacing(1.5),
  },
  checkboxLabel: {
    fontSize: '0.75rem'
  },
  pay: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: 'center',
    width: '100%',
    paddingTop: theme.spacing(1.5),
  }
}));

export default () => {
  const classes = useStyles();
  const [state, setState] = React.useState({checked: false});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <FormControlLabel
          control={
            <Checkbox
              size={"small"}
              checked={state.checked}
              name={"checked"}
              onChange={handleChange}
              color="primary"
            />
          }
          label={<Typography variant={"inherit"} className={classes.checkboxLabel}>我已阅读并同意接受<Link href={'/personal'}><a>KeyPool云算力001期合约</a></Link></Typography>}
        />
      </div>
      <Divider/>
      <div className={classes.pay}>
        <Typography>总计：¥1500.00</Typography>
        <Button variant={"contained"} color={"primary"} disabled={!state.checked} onClick={() => Router.push(`${PATH_PREFIX}/pay`)}>确认支付</Button>
      </div>
    </div>
  );
};

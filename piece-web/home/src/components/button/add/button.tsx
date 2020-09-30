import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ReactDOM from "react-dom";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import clsx from 'clsx';

const useStyles = makeStyles((theme) =>
  createStyles({
    button: {
      position: 'fixed',
      right: theme.spacing(3),
      bottom: theme.spacing(3),
      width: 56,
      height: 56,
      animation: "$componentsButtonAdd 1s",
    },
    "@keyframes componentsButtonAdd": {
      "0%": {
        width: '0',
        height: '0',
        opacity: "0"
      },
      "100%": {
        width: 56,
        height: 56,
        opacity: "1"
      }
    },
  }),
);

export default ({className, ...props}: any) => {
  const classes = useStyles();
  const [component, setComponent] = React.useState(<></>);

  React.useEffect(() => {
    setComponent(ReactDOM.createPortal(
      <Fab color="primary" className={clsx(classes.button, className)} {...props} component="span">
        <AddIcon />
      </Fab>
    , document.body));
  }, []);

  
  return component;
};

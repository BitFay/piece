import React from 'react';
import clsx from "clsx";
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from "@material-ui/core/Typography";
import {makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  progressBar: {
    marginTop: theme.spacing(1)
  },
  progressData: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: theme.spacing(1)
  },
}));

export default ({className}: any) => {
  const classes = useStyles();

  return (
    <div className={clsx(className)}>
      <Typography>总计：8PB</Typography>
      <LinearProgress className={classes.progressBar} variant="determinate" value={80} />
      <div className={classes.progressData}>
        <Typography color="textSecondary" variant={"inherit"}>
          已售：8020TB
        </Typography>
        <Typography color="textSecondary" variant={"inherit"}>
          剩余：2000TB
        </Typography>
      </div>
    </div>
  );
}

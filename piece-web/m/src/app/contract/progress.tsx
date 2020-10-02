import React from 'react';
import clsx from "clsx";
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from "@material-ui/core/Typography";
import {makeStyles, Theme} from "@material-ui/core/styles";
import {Product} from "@/app/product/index.d";

interface Props {
  className?: string
  data: Product
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    fontSize: '0.75rem'
  },
  progressBar: {
    margin: theme.spacing(0.5, 0)
  },
  progressData: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

export default ({className, data}: Props) => {
  const classes = useStyles();
  const sell = data.totalUnits - data.remainingUnits;
  const ratio = sell*100/data.totalUnits;
  return (
    <div className={clsx(classes.root, className)}>
      <Typography variant={"inherit"}>总计：{data.totalUnits}TB</Typography>
      <LinearProgress className={classes.progressBar} variant="determinate" value={ratio} />
      <div className={classes.progressData}>
        <Typography color="textSecondary" variant={"inherit"}>
          已售：{sell}TB
        </Typography>
        <Typography color="textSecondary" variant={"inherit"}>
          剩余：{data.remainingUnits}TB
        </Typography>
      </div>
    </div>
  );
}

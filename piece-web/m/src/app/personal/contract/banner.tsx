import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Theme} from "@/components/theme";
import Typography from "@material-ui/core/Typography";
import {getJson} from '@fay-react/lib/fetch';
import {BASE_SERVICE_URL, PATH_PREFIX} from '@/env';
import { Contxt } from './ctx';

const height = 100;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height,
    backgroundColor: theme.palette.primary.main,
    background: `url('${PATH_PREFIX}/static/banner/2.png') no-repeat center`,
    backgroundSize: 'cover',
    color: theme.palette.common.white
  },
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
  },
  title: {

  },
  title1: {
    fontSize: '0.75rem',
    fontWeight: 'bold',
    margin: theme.spacing(3, 0, 0.5, 0)
  },
  title2: {
    fontSize: '1.5rem'
  },
}));

export default () => {
  const classes = useStyles();
  const [total, setTotal] = React.useState<number>(0);
  const Ctx: any = React.useContext(Contxt);

  React.useEffect(() => {
    getData();
  }, [Ctx?.state.value]);

  const getData = () => getJson({ path: BASE_SERVICE_URL + '/hold/total' }).then(res => {
    if (res.status === 0) {
      setTotal(res.total);
      Ctx.dispatch({ type: "Transfer", payload: res.canTransfer })
    }
  })

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div className={classes.title}>
          <Typography className={classes.title1}>我的总算力</Typography>
          <Typography className={classes.title2}>{total}TB</Typography>
        </div>
      </div>
    </div>
  );
};

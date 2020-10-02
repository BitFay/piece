import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import BriefDescGrid from './brief-desc-grid';
import Progress from './progress';
import {Theme} from "@/components/theme";
import {Product} from "@/app/product/index.d";
import Bank from '@/components/icons/bank';
import Alipay from '@/components/icons/alipay';
// import Wxpay from '@/components/icons/wxpay';
interface Props {
  data: Product
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: theme.palette.common.white,
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
    border: 'none',
    padding: theme.spacing(2.5, 2, 2, 3),
    '& .MuiCardContent-root': {
      padding: theme.spacing(2)
    }
  },
  title: {
    display: "flex"
  },
  name: {
    fontSize: '1.5rem',
    fontWeight: 500,
  },
  desc: {
    fontSize: '0.75rem',
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(1),
  },
  chip: {
    color: theme.colors.skyBlue,
    borderColor: theme.colors.skyBlue,
    marginRight: theme.spacing(1)
  },
  briefDescGrid: {
    margin: theme.spacing(2.5, 0)
  },
  payMode: {
    marginTop: theme.spacing(2),
    display: "flex",
    alignItems: "center"
  },
  payModeText: {
    marginRight: theme.spacing(1)
  },
  imgSpace: {
    margin: theme.spacing(0, 1)
  }
}));

export default ({data}: Props) => {
  const classes: any = useStyles();
console.log(data);
  return (
      <div className={classes.root}>
          <div className={classes.title}>
            <Typography className={classes.name}>
              {data.name}
            </Typography>
          </div>
          <Typography color="textSecondary" className={classes.desc}>
            {data.desc}
          </Typography>
          {data.status !== 'SoldOut' && <Chip className={classes.chip} label="NEW" variant="outlined" size={"small"}/>}
          {/* <Chip className={classes.chip} label="NEW" variant="outlined" size={"small"}/> */}
          {/* <Chip className={classes.chip} label="预售" variant="outlined" size={"small"}/> */}
          <BriefDescGrid data={data} className={classes.briefDescGrid}/>
          <Progress data={data}/>
          <div className={classes.payMode}>
            <Typography variant={"inherit"} color={"textSecondary"} className={classes.payModeText}>
              支付方式
            </Typography>
            <Alipay className={classes.imgSpace}/>
            {/* <Wxpay className={classes.imgSpace}/> */}
            <Bank className={classes.imgSpace}/>
          </div>
      </div>
  );
}

import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
// import Chip from '@material-ui/core/Chip';
import Tag from '@/components/tag';
import BriefDescGrid from '../brief-desc-grid';
import {Theme} from "@/components/theme";
import Router from 'next/router';
import {PATH_PREFIX} from '@/env';
import {Product} from "@/app/product/index.d";
import PriceText from '@/components/text/price';
// import clsx from 'clsx';

interface Props {
  data: Product
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    overflow: 'hidden',
    position: 'relative',
    // height: 160,
    width: '100%',
    boxShadow: '0px 30px 81px rgba(33, 33, 33, 0.11)',
    border: 'none',
    marginBottom: theme.spacing(3),
    '& .MuiCardContent-root': {
      padding: theme.spacing(2)
    }
  },
  tag: {
    marginTop: '-6px',
    borderRadius: '4px 0px 0px 0px'
  },
  title: {
    display: "flex"
  },
  name: {
    fontSize: '1rem',
    fontWeight: "bold",
  },
  desc: {
    fontSize: '0.875rem',
    marginTop: theme.spacing(0.75),
    marginBottom: theme.spacing(2),
  },
  progress: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: theme.spacing(1),
  },
  progressLeft: {
    fontSize: '0.875rem',
    fontWeight: 500,
  },
  progressRight: {
    fontSize: '0.75rem',
    color: theme.colors.grey
  },
  payMode: {
    fontSize: '0.75rem',
    marginTop: theme.spacing(5)
  },
  payBtn: {
    fontSize: '1.1875rem',
    marginTop: theme.spacing(5),
    width: '100%'
  },
  chip: {
    color: theme.colors.skyBlue,
    borderColor: theme.colors.skyBlue,
    marginLeft: theme.spacing(1)
  },
  chipEmpty: {
    color: theme.palette.grey[500],
    borderColor: theme.palette.grey[500],
    marginLeft: theme.spacing(1)
  },
  soldOut: {
    position: 'absolute',
    width: 88,
    height: 88,
    right: 0,
    top: 0
  }
}));

export default ({data}: Props) => {
  const classes: any = useStyles();

  const handleBuy = () => {
    !empty && Router.push({
      pathname: PATH_PREFIX + '/contract',
      query: { id: data.id },
    })
  }

  const empty = data.remainingUnits === 0;

  return (
    <>
      { !empty && <Tag className={classes.tag} color={'skyBlue'}>{'NEW'}</Tag>}
      <Card className={classes.root}>
        <CardActionArea onClick={handleBuy}>
          <CardContent>
            <div className={classes.title}>
              <Typography className={classes.name}>
                {data.name}
              </Typography>
              {/* <Chip className={clsx(classes.chip, {[classes.chipEmpty]: empty})} label="预售" variant="outlined" size={"small"}/> */}
            </div>
            <Typography color="textSecondary" className={classes.desc}>
              {data.desc}
            </Typography>
            <BriefDescGrid data={data}/>
            <div className={classes.progress}>
              <Typography className={classes.progressLeft}  color={"secondary"}>
                <PriceText value={data.pricePerUnit}/> / TB
              </Typography>
              <Typography className={classes.progressRight} color="textSecondary">
                剩余：{data.remainingUnits}TB
              </Typography>
            </div>
          </CardContent>
        </CardActionArea>
        {empty && <img src={`${PATH_PREFIX}/static/product/soldout.png`} className={classes.soldOut}/>}
      </Card>
    </>
  );
}

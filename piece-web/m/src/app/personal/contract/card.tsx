import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import BriefDescGrid from '@/app/product/brief-desc-grid';
import Progress from './progress';
import { Theme } from "@/components/theme";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Contract } from '../../contract/index.d';
import moment from 'moment';
import { PATH_PREFIX } from '@/env';
import Router from 'next/router';
import PriceText from '@/components/text/price';
import { Box } from '@material-ui/core';
import { Contxt } from './ctx';

interface Props {
  data: Contract,
  drawerFuc: any,
  fee?: string
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    overflow: 'hidden',
    position: 'relative',
    // height: 254,
    width: '100%',
    boxShadow: '0px 30px 81px rgba(33, 33, 33, 0.11)',
    border: 'none',
    marginBottom: theme.spacing(3),
    '& .MuiCardContent-root': {
      padding: theme.spacing(0)
    },
    '& .MuiExpansionPanel-root.Mui-expanded': {
      marginBottom: theme.spacing(1.5)
    },
    '& .MuiExpansionPanelDetails-root': {
      paddingBottom: 0
    }
  },
  name: {
    fontSize: '1rem',
    fontWeight: 500,
  },
  desc: {
    fontSize: '0.75rem',
    marginTop: theme.spacing(0.75),
  },
  progress: {
    marginTop: theme.spacing(1)
  },
  divider: {
    margin: theme.spacing(0, 2)
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: '0.75rem',
    padding: theme.spacing(1.5, 2)
  },
  expansionPanelDetails: {
    width: '100%'
  },
  countDay: {
    display: "block",
    marginTop: theme.spacing(1),
    fontSize: '0.75rem',
    color: theme.colors.deepGrey
  },
  buy: {
    fontSize: '1rem',
    color: '#212121',
    fontWeight: 500
  },
  boxBtn: {
    display: 'flex',
    height: 24
  },
  btnGive: {
    fontSize: '0.75rem',
    minWidth: 40,
    padding: '2px 1px 1px'
  },
  btn: {
    fontSize: '0.75rem',
    marginLeft: theme.spacing(1),
    padding: '2px 5px 1px'
  },
  expanContent: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
  },
  expanIcon: {
    padding: '1px'
  },
  expanDes: {
    color: '#212121',
    fontSize: '0.75rem',
    display: 'flex',
    alignItems: 'center'
  },
  accordion: {
    marginTop: '1px',
    '&.MuiAccordion-root:before': {
      backgroundColor: '#FFFFFF'
    }
  }
}));

export default ({ data, drawerFuc, fee }: Props) => {
  const classes: any = useStyles();
  const Ctx: any = React.useContext(Contxt);
  const [expand, setExpand] = React.useState(false);
  const dueYear = moment(data.product.dueDate)
  const onYear = new Date();
  let day = dueYear.diff(onYear, 'day');
  if (day < 0) day = 0;

  const handleBuy = () => {
    Router.push({
      pathname: PATH_PREFIX + '/contract',
      query: {
        id: data.product.id
      }
    })
  }
  const expanChange = (_event: object, expanded: boolean) => setExpand(expanded);
  return (
    <Card className={classes.root}>
      <CardContent>
        <div className={classes.footer}>
          <div>
            <Typography className={classes.buy}>
              已购算力：{data.holdUnits}TB
            </Typography>
            <Typography variant={"inherit"} className={classes.countDay}>
              交付日期：{data.product.dueDateDesc}
            </Typography>
          </div>
          {
            <Box className={classes.boxBtn}>
              {Ctx?.state.canTransfer ? <Button disabled={!data.canTransfer} variant={"outlined"} color={"primary"} className={classes.btnGive} onClick={drawerFuc}>转让</Button> : null}
              {data.product.remainingUnits > 0 && <Button variant={"outlined"} color={"primary"} className={classes.btn} onClick={handleBuy}>继续购买</Button>}
            </Box>
          }
        </div>
        <Divider className={classes.divider} />
        <Accordion elevation={0} square onChange={expanChange} className={classes.accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            classes={{ expandIcon: classes.expanIcon }}
          >
            <div className={classes.expanContent}>
              <Box>
                <Typography className={classes.name}>
                  {data.product.name}
                </Typography>
                <Typography color="textSecondary" className={classes.desc}>
                  单价：<PriceText value={data.product.pricePerUnit} /> / TB
              </Typography>
              </Box>
              <Typography className={classes.expanDes}>{expand ? '收起' : '展开'}</Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className={classes.expansionPanelDetails}>
              <BriefDescGrid data={data.product} fee={fee} />
              <Progress className={classes.progress} data={data.product} />
            </div>
          </AccordionDetails>
        </Accordion>
      </CardContent>
    </Card>
  );
}

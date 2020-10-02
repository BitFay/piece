import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import BriefDescGrid from '@/app/product/brief-desc-grid';
import Progress from './progress';
import { Theme } from "@/components/theme";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Contract, TransferDetail } from '../../contract/index.d';
import moment from 'moment';
import PriceText from '@/components/text/price';
import { Box } from '@material-ui/core';

interface Props {
  data: Contract,
  transfer?: TransferDetail
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    overflow: 'hidden',
    position: 'relative',
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
    },
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
    flexDirection: 'column',
    fontSize: '0.75rem',
    padding: theme.spacing(1.5, 2)
  },
  numContent: {
    marginTop: theme.spacing(1.5),
    display: 'flex',
    justifyContent: "space-between",
  },
  numFlex: {
    flex: 1
  },
  expansionPanelDetails: {
    width: '100%'
  },
  countDay: {
    display: "block",
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
  },
  txt: {
    fontSize: '0.75rem',
    color: '#212121',
  },
  txtNum: {
    fontSize: '0.75rem',
    color: theme.palette.primary.main
  }
}));

export default ({ data, transfer }: Props) => {
  const classes: any = useStyles();
  const [expand, setExpand] = React.useState(false);
  const dueYear = moment(data.product.dueDate)
  const onYear = new Date();
  let day = dueYear.diff(onYear, 'day');
  if (day < 0) day = 0;

  const expanChange = (_event: object, expanded: boolean) => setExpand(expanded);
  return (
    <Card className={classes.root}>
      <CardContent>
        <div className={classes.footer}>
          <Typography className={classes.buy}>转出算力：{transfer?.transferUnit}TB</Typography>
          <div className={classes.numContent}>
            <Box className={classes.numFlex}>
              <Typography variant={"inherit"} className={classes.countDay}>转去账户</Typography>
              <Box mt={0.5}><Typography variant={"inherit"} className={classes.txt}>{transfer?.targetUserName}</Typography></Box>
              {/* <Typography variant={"inherit"} className={classes.countDay}>服务费累计返还</Typography>
              <Box mt={0.5}><Typography variant={"inherit"} className={classes.txtNum}>{transfer?.totalMiningFeeIncome}FIL</Typography></Box> */}
            </Box>
            <Box className={classes.numFlex}>
              <Typography variant={"inherit"} className={classes.countDay}>转出时间</Typography>
              <Box mt={0.5}><Typography variant={"inherit"} className={classes.txt}>{moment(transfer?.transferDate).format('YYYY-MM-DD HH:mm:ss')}</Typography></Box>
            </Box>
          </div>
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
              <BriefDescGrid data={data.product} fee={data.transferServiceFeeRateDesc} />
              <Progress className={classes.progress} data={data.product} />
            </div>
          </AccordionDetails>
        </Accordion>
      </CardContent>
    </Card>
  );
}

import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@/components/theme";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ContractDrawer from '@/app/personal/order/detail/contract-drawer';
import Alipay from '@/components/icons/alipay';
// import Wxpay from '@/components/icons/wxpay';
import Bank from '@/components/icons/bank';
import PriceText from '@/components/text/price';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    margin: theme.spacing(3, 0)
  },
  label: {
    color: theme.palette.grey[500],
    marginRight: theme.spacing(2)
  },
  labelPay: {
    color: theme.palette.grey[500],
    marginLeft: theme.spacing(1)
  },
  modeLabelActive: {
    color: theme.palette.common.black,
    fontWeight: 500
  },
  mode: {
    display: "flex",
    alignItems: "center",
    justifyContent: 'space-between'
  },
  modeSpace: {
    marginTop: theme.spacing(1)
  },
  modeBtn: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    cursor: "pointer",
    padding: theme.spacing(0.75, 2.5),
    textAlign: "center",
    height: 40,
  },
  modeBtnActive: {
    border: `1px solid ${theme.palette.primary.main}`,
  },
  checkboxLabel: {
    fontSize: '0.75rem'
  },
  formSpace: {
    marginTop: theme.spacing(2)
  },
  bank: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(3),
    // width: 480,
    border: '1px solid #E0E0E0'
  },
  bankTxt1: {
    fontSize: '0.875rem',
    color: '#424242',
    marginBottom: theme.spacing(1)
  },
  bankTxt2: {
    fontSize: '1.25rem',
    color: '#212121',
    fontWeight: 500,
  },
  bankTxt3: {
    fontSize: '0.875rem',
    color: '#D70D26',
    marginTop: theme.spacing(1),
  },
  bankTxt4: {
    fontSize: '0.875rem',
    color: '#D70D26',
    marginBottom: theme.spacing(2),
  },
  paper: {
    backgroundColor: theme.palette.grey[100],
    margin: theme.spacing(3, 0, 0),
    padding: theme.spacing(2)
  },
  disOrg: {
    color: '#212121',
    fontSize: '0.875rem',
    textDecoration: 'line-through'
  },
  disNow: {
    textDecoration: 'inherit',
    marginTop: theme.spacing(0.5)
  },
  special: {
    color: theme.colors.deepGrey,
    fontSize: '0.75rem'
  },
  err: {
    fontSize: '0.75rem'
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  listItem: {
    width: '45%',
    // marginRight: 15
  }
}));
const icons = [{
  title: '支付宝',
  icon: <Alipay />,
  mode: 1,
},
//  {
//   title: '微信',
//   icon: <Wxpay />,
//   mode: 2,
// }, 
{
  title: '银行卡',
  icon: <Bank />,
  mode: 3,
}]

export default ({ data, coupon, error, count, onChange }: any) => {
  const classes = useStyles();
  const [mode, setMode] = React.useState(1);
  const [checked, setChecked] = React.useState(false);
  const [value, setValue] = React.useState({ name: '' });
  React.useEffect(() => setValue(data), [data]);

  const handleModeChange = (val: number) => {
    onChange && onChange(val, checked);
    setMode(val);
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(mode, event.target.checked);
    setChecked(event.target.checked);
  };
  return (
    <div className={classes.root}>
      <div className={classes.mode}>
        <Typography className={classes.label}>支付方式</Typography>
      </div>
      <List className={classes.list}>
        {
          icons.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem disableGutters className={classes.listItem}>
                <Paper elevation={1} variant={item.mode === mode ? "elevation" : "outlined"} className={clsx(classes.modeBtn, { [classes.modeBtnActive]: item.mode === mode })} onClick={() => handleModeChange(item.mode)}>
                  {item.icon}
                  <Typography className={clsx(classes.labelPay, { [classes.modeLabelActive]: item.mode === mode })}>{item.title}</Typography>
                </Paper>
              </ListItem>
            </React.Fragment>
          ))
        }
      </List>
      {mode === 1 || mode === 2 ?
        <>
          {coupon ?
            <Paper variant={"outlined"} className={classes.paper}>
              <Typography className={classes.disOrg}>
                原价：<PriceText value={data?.pricePerUnit * count} />
              </Typography>
              <Typography className={clsx(classes.disOrg, classes.disNow)}>
                优惠码：{coupon?.code}
              </Typography>
              <Typography className={classes.special}>
                单价：<PriceText value={data?.pricePerUnit} />/TB
              </Typography>
              {
                error && error.length > 0 ?
                  <Typography color={"secondary"} className={classes.err}>{error}</Typography> : null
              }
            </Paper> : null}
          <FormControlLabel
            control={
              <Checkbox
                size={"small"}
                checked={checked}
                name={"checked"}
                onChange={handleChange}
                color="primary"
              />
            }
            label={<Typography variant={"inherit"} className={classes.checkboxLabel}>我已阅读并同意接受<ContractDrawer text={'《' + (value && value.name ? value.name : '') + '合约》'} /></Typography>}
            className={classes.formSpace}
          />
        </>
        :
        <div className={classes.bank}>
          <Typography className={classes.bankTxt1}>汇款至</Typography>
          <Typography className={classes.bankTxt2}>开户行:中国银行股份有限公司老城开发区支行</Typography>
          <Typography className={classes.bankTxt2}>户名:海南墨灵网络科技有限公司</Typography>
          <Typography className={classes.bankTxt2}>账号:2675 3398 4628</Typography>
          <Typography className={classes.bankTxt3}>请附言备注您的KeyPool账户名，例如:</Typography>
          <Typography className={classes.bankTxt4}>“KeyPool用户:13812345678” 或 “KeyPool用户:123@qq.com”</Typography>
          <Typography variant={"inherit"} className={classes.checkboxLabel}>汇款视为您已阅读并同意<ContractDrawer text={'《' + value?.name + '合约》'} /></Typography>
        </div>}
    </div>
  )
}
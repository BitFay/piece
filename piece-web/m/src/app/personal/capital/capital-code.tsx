import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import { Theme } from "@/components/theme";
import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';
import TF from '@/components/text-field';
import HighlightOff from '@material-ui/icons/HighlightOff';
import CodeInput from '@/components/text-field/code-text-field';
import InputAdornment from '@material-ui/core/InputAdornment';
import Box from '@material-ui/core/Box';
import { transferValue } from './money-number';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { postJson, getJson } from '@fay-react/lib/fetch';
import { BASE_URL, BASE_SERVICE_URL } from '@/env';
import { getUser } from '@fay-react/lib/user';
import { splitNumber } from '@/app/personal/capital/number-fixed';

interface Props {
  open: boolean
  onClose: any
  data?: any
  onResult?: Function
  limit: Array<any>
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .MuiDrawer-paperAnchorBottom': {
      borderRadius: '16px 16px 0px 0px'
    }
  },
  content: {
    padding: theme.spacing(0, 2, 2.5, 2)
  },
  title: {
    color: '#212121',
    fontSize: '1.25rem',
    fontWeight: 500
  },
  price: {
    fontSize: '0.75rem'
  },
  textField: {
    marginTop: theme.spacing(3.5),
    width: '100%',
  },
  center: {
    textAlign: 'center'
  },
  pay: {
    height: 48
  },
  topContent: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '5px 5px 0 0'
  },
  topImg: {
    width: 20,
    height: 20,
    color: theme.colors.deepGrey
  },
  tf: {
    margin: theme.spacing(4, 0, 3.5)
  },
  tfTop: {
    margin: theme.spacing(3.5, 0, 1),
  },
  adron: {
    '&:hover': {
      backgroundColor: '#FFFFFF',
    }
  },
  fee: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  feeTxt: {
    fontSize: '0.75rem',
    color: theme.colors.deepGrey
  },
  numContent: {
    position: 'relative'
  },
  bottom: {
    margin: theme.spacing(0, 2, 2.5)
  },
  otherContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(5.5, 0, 12.5)
  },
  succImg: {
    width: 54,
    height: 54,
    color: '#0CC73B'
  },
  failImg: {
    width: 54,
    height: 54,
    color: '#D70D26'
  }
}));

type Sta = 'normal' | 'success' | 'fail';

export default ({ open, onClose, onResult, limit }: Props) => {
  const classes = useStyles();
  const user = getUser();
  const [status, setStatus] = React.useState<Sta>('normal');
  const [loading, setLoading] = React.useState(false);
  const [send, setSend] = React.useState(true);
  const [total, setTotal] = React.useState('');
  const [values, setValues] = React.useState({
    focus: false,
    address: '',
    num: '',
    code: '',
    err: '',
  })
  const [error, setError] = React.useState('');
  const [helpText, setHelpText] = React.useState('');
  React.useEffect(() => {
    setError('');
    setHelpText('');
    setValues({ focus: false, address: '', num: '', code: '', err: '' });
    setStatus('normal');
    open && getJson({ path: BASE_SERVICE_URL + '/asset/canUseNumber/Filecoin' }).then((res: any) => {
      if (res.status === 0) {
        setTotal(splitNumber(res.canUseNumber));
      }
    })
  }, [open])

  const handlePrepare = () => {
    if (status === 'normal') {
      handleSubmitCode();
    } else if (status === 'fail') {
      setStatus('normal');
      setValues({ ...values, code: '' });
    } else {
      onResult && onResult();
      onClose();
    }
  }

  const handleSubmitCode = () => {
    if (!values.address && values.address === '') {
      setError('请输入转出地址');
      return;
    }
    if (!values.num && values.num === '') {
      setError('请输入转出数量');
      return;
    }
    if (!values.code && values.code === '') {
      setError('请输入验证码');
      return;
    }

    if (!Number.parseFloat(values.num)) {
      setStatus('fail');
      setError('请输入正确转出数量');
      return;
    }
    if (limit.length > 1 && Number.parseFloat(values.num) < limit[1]['value']) {
      setStatus('fail');
      setError('小于最小转出数量');
      return;
    }
    if (limit.length > 2 && Number.parseFloat(values.num) > limit[2]['value']) {
      setStatus('fail');
      setError('大于最大转出数量');
      return;
    }
    setLoading(true);
    postJson({
      path: BASE_SERVICE_URL + '/asset/withdrawApply', data: {
        verifyCode: values.code,
        withdrawAddress: values.address,
        withdrawNumber: values.num
      }
    })
      .then((resp: any) => {
        setLoading(false);
        if (resp.status === 0) {
          setStatus('success');
          onResult && onResult();
        } else {
          setStatus('fail');
          setError(resp.message);
        }
      })
  }
  const codeRequest = async (fuc: any) => {
    if (send) {
      setSend(false);
      const res: any = await accountCode();
      setSend(true);
      if (res === 'ok') {
        fuc();
      } else {
        // setError(res);
        setHelpText(res);
      }
    }
  }
  const accountCode = () => new Promise((resolve) => {
    const data = {
      mfaType: /@/.test(user.name) ? 'Email' : 'Sms',
      businessType: "Withdraw",
      mobileNo: user.mobileNo,
      country: user.mobileCountry,
      email: user.email
    }
    postJson({ path: BASE_URL + '/mfaSendCode', data })
      .then((resp: any) => {
        setLoading(false);
        if (resp.status === 0) {
          resolve('ok');
        } else {
          resolve(resp.message);
        }
      })
  })

  const handleFocus = () => setValues({ ...values, focus: true });
  const handleBlur = () => setValues({ ...values, focus: false });
  const handleCodeChange = (e: any) => {
    setValues({ ...values, code: e });
    setHelpText('');
  }
  const handleClickAll = () => setValues({ ...values, num: total });

  const handleNum = (e: any) => {
    if (e.target.value.length < 13) {
      const v = e.target.value;
      let newValue = transferValue(v, values.num);
      newValue = newValue ? newValue.replace(/,/g, '') : '';
      if (newValue.indexOf('-') !== -1) return;
      if (newValue.indexOf('+') !== -1) return;
      setValues({ ...values, num: newValue })
    }
  }

  const handleAddress = (e: any) => {
    if (/[\u4E00-\u9FA5\uF900-\uFA2D]/.test(e.target.value)) return;
    setValues({ ...values, address: e.target.value, err: '' });
    setError('')
  }

  const handleAddressBlur = (e: any) => {
    let err = '';
    if (e.target.value.indexOf('f1') !== 0 ||
      e.target.value.length !== 41 ||
      !/^[a-z2-7]+$/.test(e.target.value.substring(2))
    ) {
      err = '请输入正确转出地址';
    }
    setValues({ ...values, err });
  }

  const capitalStatus = () => {
    const NormalDom = () => (
      <div className={classes.content}>
        <TF label="转出地址" value={values.address} onChange={handleAddress} onBlur={handleAddressBlur} fullWidth className={classes.tf} error={Boolean(values.err)} helperText={values.err}/>
        <Box className={classes.fee} mb={1}>
          <Typography className={classes.feeTxt}>转出手续费（{limit && limit.length ? limit[0]['value'] : '-'}FIL）</Typography>
          <Box style={{ display: 'flex' }}>
            <Typography className={classes.feeTxt} style={{ wordBreak: 'break-all' }}>最小转出数量{limit && limit.length > 1 ? limit[1]['value'] : '-'}FIL</Typography>
            {limit && limit.length > 2 ? <Typography className={classes.feeTxt} style={{ wordBreak: 'break-all' }}>/最大转出数量{limit[2]['value']}FIL</Typography> : null}
          </Box>
        </Box>
        <div className={classes.numContent}>
          <TF
            value={values.num}
            onChange={handleNum}
            fullWidth
            label='数量'
            InputProps={{
              endAdornment: (
                <InputAdornment
                  disableTypography
                  position="end"
                  className={classes.adron}
                  onClick={handleClickAll}
                >
                  <span style={{ color: '#263BE0', fontSize: '0.875rem' }}>全部</span>
                </InputAdornment>
              )
            }}
          />
          {values.num.length > 0 ? <Typography style={{ position: 'absolute', color: '#212121', fontSize: '0.75rem', bottom: 0, left: '15px', marginBottom: 10, marginLeft: String(values.num).length * 9.2 }}>FIL</Typography> : null}
        </div>
        <div className={classes.tfTop}>
          <CodeInput start={false} onClick={codeRequest} onFocus={handleFocus} onBlur={handleBlur} onChange={handleCodeChange} helpText={helpText} />
        </div>
      </div>
    )
    const SuccessDom = () => (
      <div className={classes.content}>
        <div className={classes.otherContent}>
          <CheckCircleIcon className={classes.succImg} />
          <Box mt={3.75} mb={1} fontSize={'1.5rem'} fontWeight={500} color={'#212121'}>转出申请完成</Box>
          <Box color={'#757575'} fontSize={'1rem'} >转出成功</Box>
        </div>
      </div>
    )
    const FailDom = () => (
      <div className={classes.content}>
        <div className={classes.otherContent}>
          <CancelIcon className={classes.failImg} />
          <Box mt={3.75} mb={1} fontSize={'1.5rem'} fontWeight={500} color={'#212121'}>转出失败</Box>
          <Box color={'#757575'} fontSize={'1rem'} >{error}</Box>
        </div>
      </div>
    )
    switch (status) {
      case 'success':
        return SuccessDom();
      case 'fail':
        return FailDom();
      default:
        return NormalDom();
    }
  }
  return (
    <Drawer anchor={"bottom"} open={open} onClose={onClose} className={classes.root}>
      <div className={classes.topContent}>
        <HighlightOff className={classes.topImg} onClick={onClose} />
      </div>
      <Box ml={2}>
        <Typography className={classes.title}>转出申请</Typography>
      </Box>
      {capitalStatus()}
      <div className={classes.bottom}>
        <Button disabled={loading || ((values.code.length === 0 || values.address.length === 0 || values.num.length === 0 || values.err !== '' ) && status === 'normal')} variant={"contained"} color={"primary"} fullWidth className={classes.pay} onClick={handlePrepare}>
          <Typography style={{ position: 'absolute', fontSize: '14px' }}>{status === 'normal' ? '确认' : status === 'success' ? '完成' : '重新输入'}</Typography>
          {loading &&
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute' }}>
              <CircularProgress size={20} />
            </div>
          }
        </Button>
      </div>
    </Drawer>
  );
}

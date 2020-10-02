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
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Box from '@material-ui/core/Box';
import { getUser } from '@fay-react/lib/user';
import { postJson } from '@fay-react/lib/fetch';
import { BASE_URL, BASE_SERVICE_URL } from '@/env';
import { Contxt } from './ctx';

interface Props {
  open: boolean
  onClose: any
  onRequest?: Function
  onResult?: Function
  id: any
  serviceFee: any
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
    height: 20
  },
  tf: {
    margin: theme.spacing(4, 0, 3.5)
  },
  numContent: {
    position: 'relative'
  },
  tfTop: {
    margin: theme.spacing(3.5, 0, 1.5),
  },
  bottom: {
    margin: theme.spacing(0, 2, 2.5)
  },
  otherContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(5.5, 0, 9.5)
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

export default ({ open, onClose, id, serviceFee }: Props) => {
  const classes = useStyles();
  const user = getUser();
  const Ctx: any = React.useContext(Contxt);
  const [status, setStatus] = React.useState<Sta>('normal');
  const [loading, setLoading] = React.useState(false);
  const [send, setSend] = React.useState(true);
  const [values, setValues] = React.useState({
    focus: false,
    address: '',
    num: '',
    code: '',
  })

  const [error, setError] = React.useState('');
  const [helpText, setHelpText] = React.useState('');
  React.useEffect(() => {
    setError('');
    setHelpText('');
    setValues({ focus: false, address: '', num: '', code: ''});
    setStatus('normal');
  }, [open])

  const handlePrepare = () => {
    if (status === 'normal') {
      handleSubmitCode();
    } else if (status === 'fail') {
      setStatus('normal');
      setValues({ ...values, code: ''});
    } else {
      onClose();
    }
  }

  const handleSubmitCode = () => {
    if (!values.address && values.address === '') {
      setError('请输入账户地址');
      return;
    }
    if (!values.num && values.num === '') {
      setError('请输入算力数量');
      return;
    }
    if (!values.code && values.code === '') {
      setError('请输入验证码');
      return;
    }
    if (!Number.parseFloat(values.num)) {
      setStatus('fail');
      setError('请输入正确转让数量');
      return;
    }
    setLoading(true);
    postJson({
      path: BASE_SERVICE_URL + '/hold/transfer',
      data: {
        productId: id,
        serviceFee,
        targetUserName: values.address,
        transferNumber: Number.parseInt(values.num),
        verifyCode: values.code
      }
    })
      .then((res: any) => {
        setLoading(false);
        if (res.status === 0) {
          Ctx.dispatch({ type: "Change", payload: {} })
          setStatus('success');
        } else {
          setError(res.message);
          setStatus('fail');
        }
      });
  }

  const handleNum = (e: any) => {
    if (e.target.value.length < 10) {
      if (e.target.value === '') {
        setValues({ ...values, num: e.target.value})
        return
      }
      if (e.target.value !== '0' && !Number.parseInt(e.target.value)) return;
      let input = Number.parseInt(e.target.value) + '';
      if(input.indexOf('-') !== -1) return;
      if(input.indexOf('+') !== -1) return;
      setValues({ ...values, num: input})
    }
  }
  const codeRequest = async (fuc: any) => {
    if (send) {
      setSend(false);
      const res: any = await accountCode();
      setSend(true);
      if (res === 'ok') {
        fuc();
      } else {
        setHelpText(res);
      }
    }
  }
  const accountCode = () => new Promise((resolve) => {
    const data = {
      mfaType: /@/.test(user.name) ? 'Email' : 'Sms',
      businessType: "HoldTransfer",
      mobileNo: user.mobileNo,
      country: user.mobileCountry,
      email: user.email
    }
    postJson({ path: BASE_URL + '/mfaSendCode', data })
      .then((resp: any) => {
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

  const handleAddress = (e: any) => {
    if (!/[\u4E00-\u9FA5\uF900-\uFA2D]/.test(e.target.value)) {
      setValues({ ...values, address: e.target.value });
      setError('')
    }
  }

  const capitalStatus = () => {
    const NormalDom = () => (
      <div className={classes.content}>
        <TF label="转去账户" value={values.address} onChange={handleAddress} fullWidth className={classes.tf} />
        <div className={classes.numContent}>
          <TF
            value={values.num}
            onChange={handleNum}
            fullWidth
            label='数量'
          />
          {values.num.length > 0 ? <Typography style={{ position: 'absolute', color: '#212121', fontSize: '0.75rem', bottom: 0, left: '15px', marginBottom: 10, marginLeft: String(values.num).length * 9.2 }}>TB</Typography> : null}
        </div>
        <div className={classes.tfTop}>
          <CodeInput start={false} onClick={codeRequest} onFocus={handleFocus} onBlur={handleBlur} onChange={handleCodeChange} helpText={helpText}/>
        </div>
      </div>
    )
    const SuccessDom = () => (
      <div className={classes.content}>
        <div className={classes.otherContent}>
          <CheckCircleIcon className={classes.succImg} />
          <Box mt={3.75} mb={1} fontSize={'1.5rem'} fontWeight={500} color={'#212121'}>转让完成</Box>
          <Box color={'#757575'} fontSize={'1rem'} >算力转让成功</Box>
        </div>
      </div>
    )
    const FailDom = () => (
      <div className={classes.content}>
        <div className={classes.otherContent}>
          <CancelIcon className={classes.failImg} />
          <Box mt={3.75} mb={1} fontSize={'1.5rem'} fontWeight={500} color={'#212121'}>转让失败</Box>
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
        <Typography className={classes.title}>转让算力到其它账户</Typography>
      </Box>
      {capitalStatus()}
      <div className={classes.bottom}>
        <Button disabled={loading || ((values.code.length === 0 || values.address.length === 0 || values.num.length === 0) && status === 'normal')} variant={"contained"} color={"primary"} fullWidth className={classes.pay} onClick={handlePrepare}>
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

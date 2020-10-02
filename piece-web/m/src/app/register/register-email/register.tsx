import React from 'react';
import clsx from 'clsx';
import Router from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Checkbox from '@material-ui/core/Checkbox';
import { Theme } from '@/components/theme';
import EmailTF from '@/components/text-field/email-text-field';
import PWInput from '@/components/text-field/password-text-field';
import { pwRules } from '@/components/text-field/password-text-field/code';
import CodeInput from '@/components/text-field/code-text-field';
import AliSlider from '@/components/ali-slider';
import ErrorInput from '@/components/err';
import Typography from '@material-ui/core/Typography';
import {
  accountFind,
  accountMfaAuthenticate,
  accountCode,
  accountRegister
} from '../request';
import { PATH_PREFIX } from '@/env';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    minHeight: 'calc(100vh - 40px)',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: 1,
    padding: theme.spacing(0, 2)
  },
  title: {
    fontWeight: 500,
    fontSize: '1.5rem',
    color: grey[900],
    padding: theme.spacing(5, 0, 4, 0.5)
  },
  tfTop: {
    margin: theme.spacing(3.5, 0),
  },
  errTop: {
    marginTop: theme.spacing(3.25),
  },
  loginTop: {
    margin: theme.spacing(3, 0),
  },
  login: {
    height: theme.spacing(6),
    borderRadius: theme.spacing(3.5),
    fontWeight: 500,
    fontSize: '0.875rem',
  },
  bottom: {
    height: 48,
    color: grey[600],
    fontSize: '0.875rem',
    borderTop: '1px solid #E0E0E0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'fixed',
    bottom: 0,
    opacity: 1,
    transition: '.5s all ease-in'
  },
  bottomBlur: {
    position: 'relative',
    opacity: 0,
    transition: '.1s all ease-in'
  },
  protocol: {
    fontSize: '0.875rem',
    color: '#008AFF',
    cursor: 'pointer'
  },
  agree: {
    display: 'flex',
    margin: theme.spacing(3.5, 0, 0, 0),
  },
  checkBox: {
    padding: 0,
    width: 18,
    height: 18,
    color: grey[300],
    '&.Mui-checked': {
      color: '#0060FF'
    },
  },
  agreeContent: {
    marginLeft: theme.spacing(1),
    color: grey[600],
    fontSize: '0.75rem'
  },
  pwTop: {
    margin: theme.spacing(3.25, 4, 0, 4),
  },
  grey: {
    color: grey[400]
  }
}))

export default () => {
  const classes = useStyles({});
  const [sliderRender, setSliderRender] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [sign, setSign] = React.useState({
    requestId: 0,
    sessionId: '',
    sig: '',
    token: '',
    scene: ''
  });
  const [values, setValues] = React.useState({
    email: '',
    password: '',
    code: '',
    codeFuc: () => null,
    aliDialog: false,
    check: false,
    focus: false,
    errPhoneText: '',
    errCodeText: '',
    errPWText: '',
    err: '',
  });
  const handleFocus = () => setValues({ ...values, focus: true });
  const handleBlur = () => setValues({ ...values, focus: false });
  const handleEmailChange = (e: any, res: boolean) => {
    if (!res) {
      setValues({ ...values, email: '', err: '' });
      return;
    }
    setValues({ ...values, email: e, err: '' })
  };
  const handleCodeChange = (e: any) => setValues({ ...values, code: e, err: '', errCodeText: '' });
  const handlePWChange = (e: any) => setValues({ ...values, password: e, err: '' });
  const handleCheckBox = (_event: any, newValue: any) => setValues({ ...values, check: newValue, err: '' });
  const handleRegister = async () => {
    setValues({ ...values, err: '' });
    setLoading(false);
    if (!values.email) {
      setValues({ ...values, errPhoneText: 'E-mail输入有误，请重新输入' });
      return;
    }
    if (!values.code) {
      setValues({ ...values, errCodeText: '请输入验证码' });
      return;
    }
    if (!values.password) {
      setValues({ ...values, err: '请输入密码' });
      return;
    };
    // const reg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[])+$)([^(0-9a-zA-Z)]|[]|[a-z]|[A-Z]|[0-9]){8,20}$/;
    // const reg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?![,\.#~!@$%'\+\*\-:;^_`]+$)[,\.#~!@$%'\+\*\-:;^_`0-9A-Za-z]{8,20}$/;
    if (!pwRules(values.password)) return;
    if (!values.check) {
      setValues({ ...values, err: '请阅读并勾选《服务协议》和《隐私政策》' });
      return;
    };
    setLoading(true);
    const res = await accountRegister(values, setValues, sign);
    setLoading(false);
    if (res) Router.push(PATH_PREFIX + '/register/succ');
  }
  const handleService = () => window.open('https://www.keystore.com/service.html');
  const handleProtocol = () => window.open('https://www.keystore.com/privacy.html');
  const handleError = () => setValues({ ...values, err: '' });
  const handleLogin = () => Router.push(PATH_PREFIX + '/login');
  const handleClose = () => {
    setSliderRender(true);
    setValues({ ...values, aliDialog: false })
  }
  const handleSign = async (data: any) => {
    setSliderRender(false);
    if (!data.sig) {
      setValues({ ...values, err: '请进行人机验证' });
      return;
    }
    setLoading(false);
    const signData = {
      requestId: new Date().getTime(),
      sessionId: data.sessionId,
      sig: data.sig,
      token: data.token,
      scene: data.scene
    }
    setSign(signData);
    setValues({ ...values, aliDialog: false });
    const res = await accountFind(values, setValues);
    if (res) {
      const auth = await accountMfaAuthenticate(signData, values, setValues);
      if (auth) {
        const res = await accountCode(values, setValues);
        if (res) values.codeFuc();
      }
    }
  }
  const codeRequest = (fuc: any) => {
    if (values.email) setValues({ ...values, aliDialog: true, codeFuc: fuc });
  }

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div className={classes.title}>注册KeyPool账号</div>
        <div ><EmailTF label={'请输入邮箱'} fullWidth onChange={handleEmailChange} onFocus={handleFocus} onBlur={handleBlur} notEmpty={true} errorText={values.errPhoneText} hot={false}/></div>
        <div className={classes.tfTop}><CodeInput start={false} onClick={codeRequest} onFocus={handleFocus} onBlur={handleBlur} helpText={values.errCodeText} onChange={handleCodeChange} codeStyle={values.email?.length ? null : classes.grey} /></div>
        <div ><PWInput onChange={handlePWChange} onFocus={handleFocus} onBlur={handleBlur} errorText={values.errPWText} hot={false}/></div>
        <div className={classes.agree}>
          <Checkbox
            checked={values.check}
            onChange={handleCheckBox}
            value="check"
            color="primary"
            className={classes.checkBox}
          />
          <div className={classes.agreeContent}>我已阅读并同意接受<span className={classes.protocol} onClick={handleService}>《服务协议》</span>和<span className={classes.protocol} onClick={handleProtocol}>《隐私政策》</span></div>
        </div>
        {values.err && values.err.length > 0 ?
          <div className={classes.errTop}>
            <ErrorInput des={values.err} callback={handleError} />
          </div> : null
        }
        <div className={classes.loginTop}>
          <Button disabled={loading} className={clsx(classes.login)} fullWidth onClick={handleRegister} color={'primary'} variant={"contained"}>
            <Typography style={{ position: 'absolute' }}>注册</Typography>
            {loading &&
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute' }}>
                <CircularProgress size={28} />
              </div>
            }
          </Button>
        </div>
      </div>
      <div className={clsx(classes.bottom, values.focus && classes.bottomBlur)}>
        <div>已有账号？<span className={classes.protocol} onClick={handleLogin}>立即登录</span></div>
      </div>
      <AliSlider open={values.aliDialog} render={sliderRender} onClose={handleClose} callback={handleSign} label={'人机验证滑块'} successText={'验证通过'} />
    </div>
  )
}
import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Theme } from '@/components/theme';
import PWInput from '@/components/text-field/password-text-field';
import { pwRules } from '@/components/text-field/password-text-field/code';
import CodeInput from '@/components/text-field/code-text-field';
import Typography from '@material-ui/core/Typography';
import Input from '@/components/text-field';
import Router from 'next/router';
import ErrorInput from '@/components/err';
import { getJson, postJson } from '@fay-react/lib/fetch';
import { BASE_URL, PATH_PREFIX } from "@/env";

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
  pwTop: {
    margin: theme.spacing(3.5, 0, 0, 0),
  },
  loginTop: {
    margin: theme.spacing(6, 0, 0, 0),
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
  find: {
    color: '#263BE0'
  },
  empty: {

  },
  grey: {
    color: grey[400]
  }
}))

export default () => {
  const classes = useStyles({});
  const [loading, setLoading] = React.useState(false);
  const requestId = new Date().getTime();
  const [values, setValues] = React.useState({
    account: '',
    password: '',
    country: 'CN',
    code: '',
    codeFuc: () => null,
    aliDialog: false,
    focus: false,
    check: false,
    errPhoneText: '',
    errCodeText: '',
    errPWText: '',
    err: '',
  });
  const handleFocus = () => setValues({ ...values, focus: true });
  const handleBlur = () => setValues({ ...values, focus: false });
  const handleAccount = (e: any) => setValues({ ...values, account: e.target.value, errPhoneText: '', err: '' });
  const handleCodeChange = (e: any) => setValues({ ...values, code: e, err: '', errCodeText: '' });
  const handlePWChange = (e: any) => setValues({ ...values, password: e, err: '', errPWText: '' });
  const handleError = () => setValues({ ...values, err: '' });
  const handleLogin = () => Router.push(PATH_PREFIX + '/login');
  const handleForget = async () => {
    setValues({ ...values, err: '' });
    setLoading(false);
    if (!values.account) {
      setValues({ ...values, errPhoneText: '请输入账号' });
      return;
    }
    if (!values.code) {
      setValues({ ...values, errCodeText: '请输入验证码' });
      return;
    }
    if (!values.password) {
      setValues({ ...values, errPWText: '请输入密码' });
      return;
    }
    // const reg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[])+$)([^(0-9a-zA-Z)]|[]|[a-z]|[A-Z]|[0-9]){8,20}$/;
    // const reg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?![,\.#~!@$%'\+\*\-:;^_`]+$)[,\.#~!@$%'\+\*\-:;^_`0-9A-Za-z]{8,20}$/;
    if (!pwRules(values.password)) return;
    setLoading(true);
    const auth = await accountMfaAuthenticate();
    if (auth) {
      const res = await accountRetrieve();
      if (res) Router.push(PATH_PREFIX + '/forget/succ');
    }
  }
  const accountFind = () => new Promise((resolve) => {
    if (values.account) {
      getJson({ path: BASE_URL + '/no-auth/existUserAccount', data: { account: values.account } })
        .then((resp: any) => {
          if (resp.status === 0) {
            resolve(true);
          } else {
            resolve(false);
            setValues({ ...values, errPhoneText: resp.message })
          }
        })
    }
  })
  const accountMfaAuthenticate = () => new Promise((resolve) => {
    postJson({
      path: BASE_URL + '/no-auth/mfaAuthenticate', data: {
        businessType: 'RetrievePassword',
        mfaType: /@/.test(values.account) ? 'Email' : 'Sms',
        robot: { sessionId: '', sig: '', token: '', scene: '' },
        requestId,
        mobile: {
          mobileNo: values.account,
          country: values.country,
          code: values.code
        },
        email: {
          email: values.account,
          code: values.code
        },
        authenticator: {
          code: values.code
        }
      }
    })
      .then((resp: any) => {
        setLoading(false);
        if (resp.status === 0) {
          resolve(true);
          setValues({ ...values, aliDialog: false, err: '' });
        } else {
          resolve(false);
          setValues({ ...values, aliDialog: false, err: resp.message });
        }
      })
  })
  const accountCode = () => new Promise((resolve) => {
    const data = {
      mfaType: /@/.test(values.account) ? 'Email' : 'Sms',
      businessType: "RetrievePassword",
      mobileNo: values.account,
      country: values.country,
      email: values.account
    }
    postJson({ path: BASE_URL + '/no-auth/retrievePassword/mfaSendCode', data })
      .then((resp: any) => {
        setLoading(false);
        if (resp.status === 0) {
          resolve(true);
        } else {
          resolve(false);
          setValues({ ...values, errPhoneText: resp.message })
        }
      })
  })
  const accountRetrieve = () => new Promise((resolve) => {
    const data = {
      account: values.account,
      newPassword: values.password,
      requestId,
      mfaType: /@/.test(values.account) ? 'Email' : 'Sms',
      code: values.code
    }
    postJson({ path: BASE_URL + '/no-auth/retrievePassword', data })
      .then((res) => {
        setLoading(false);
        if (res.status === 0) {
          resolve(true);
        } else {
          setValues({ ...values, err: res.message });
          resolve(false);
        }
      })
  })
  const codeRequest = async (fuc: any) => {
    const find = await accountFind();
    if (find) {
      const res = await accountCode();
      if (res) fuc();
    }
  }
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div className={classes.title}>找回密码</div>
        <div ><Input label='请输入您要找回密码的账号' fullWidth onChange={handleAccount} onFocus={handleFocus} onBlur={handleBlur} error={values.errPhoneText?.length > 0} helperText={values.errPhoneText} /></div>
        <div className={classes.pwTop}>
          <CodeInput start={false} onClick={codeRequest} onFocus={handleFocus} onBlur={handleBlur} helpText={values.errCodeText} onChange={handleCodeChange} codeStyle={values.account?.length ? null : classes.grey} />
        </div>
        <div className={classes.pwTop}>
          <PWInput onChange={handlePWChange} onFocus={handleFocus} onBlur={handleBlur} errorText={values.errPWText} hot={false}/>
        </div>
        {values.err && values.err.length > 0 ?
          <div className={classes.pwTop}>
            <ErrorInput des={values.err} callback={handleError} />
          </div> : null}
        <div className={classes.loginTop}>
          <Button disabled={loading} className={clsx(classes.login)} fullWidth onClick={handleForget} color={'primary'} variant={"contained"}>
            <Typography style={{ position: 'absolute' }}>确认</Typography>
            {loading &&
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute' }}>
                <CircularProgress size={28} />
              </div>
            }
          </Button>
        </div>
      </div>
      <div className={clsx(classes.bottom, values.focus && classes.bottomBlur)} onClick={handleLogin}>
        <div>已有账号？</div>
        <div className={classes.find}>立即登录</div>
      </div>
    </div>
  )
}
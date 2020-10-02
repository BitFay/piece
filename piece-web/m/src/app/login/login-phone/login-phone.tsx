import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@/components/theme';
import { grey } from '@material-ui/core/colors';
import CountryInput from '@/components/country-input';
import PWInput from '@/components/text-field/password-text-field';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import clsx from 'clsx';
import Router from 'next/router'
import { accountLogin } from '../request';
import ErrorInput from '@/components/err';
import AliSlider from '@/components/ali-slider';
import { PATH_PREFIX } from '@/env';
import OAuth2 from '../../oauth2';
import { getQueryString } from '@fay-react/lib/router';
import Typography from '@material-ui/core/Typography';
import {removeUser} from '@fay-react/lib/user';
import {remove as removeCookie} from '@fay-react/lib/cookie';

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
    justifyContent: 'space-between',
    flexDirection: 'row',
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
  bottomContent: {
    width: 150,
    display: 'flex',
    justifyContent: 'center'
  },
  find: {
    color: '#263BE0'
  }
}))

export default () => {
  const classes = useStyles({});

  const [submitOAuth2, setSubmitOAuth2] = React.useState(false);
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
    phone: '',
    password: '',
    country: 'CN',
    aliDialog: false,
    focus: false,
    errPhoneText: '',
    errPWText: '',
    err: '',
    response: null
  });
  const handleFocus = (e: any) => {
    setValues({ ...values, focus: true, response: e });
  }
  const handleBlur = (e: any) => {
    setValues({ ...values, focus: false, response: e });
  }
  const handleCountry = (e: any) => {
    setValues({ ...values, country: e, err: '' });
  }
  const handlePhoneChange = (e: any, res: boolean) => {
    if (!res) {
      setValues({ ...values, phone: '', err: '' });
      return;
    }
    if (values.country === 'CN' && e.length !== 11) {
      setValues({ ...values, phone: '', err: '' });
      return;
    }
    if (values.country === 'HK' && e.length > 8) {
      setValues({ ...values, phone: '', err: '' });
      return;
    }
    setValues({ ...values, phone: e, err: '', errPhoneText: '' });
  }
  const handlePWChange = (e: any) => setValues({ ...values, password: e, err: '', errPWText: '' });
  const handleError = () => setValues({ ...values, err: '' });
  const handleLogin = () => {
    console.log(sign);
    removeUser();
    removeCookie("OAUTH2SESSION", {path: '/'});
    removeCookie("JSESSIONID", {path: '/'});
    setValues({ ...values, err: '' });
    setLoading(false);
    if (!values.phone) {
      setValues({ ...values, err: '请输入账号' });
      return;
    }
    if (!values.password) {
      setValues({ ...values, err: '请输入密码' });
      return;
    };
    setLoading(true);
    setValues({ ...values, aliDialog: true });
    return;
  }
  const handleForget = () => Router.push(PATH_PREFIX + '/forget');
  const handleRegister = () => Router.push(PATH_PREFIX + '/register');
  const handleClose = () => {
    setSliderRender(true);
    setLoading(false);
    setValues({ ...values, aliDialog: false })
  }
  const handleSign = async (data: any) => {
    setSliderRender(false);
    if (!data.sig) {
      setLoading(false);
      setValues({ ...values, err: '请进行人机验证' });
      return;
    }
    const signData = {
      requestId: new Date().getTime(),
      sessionId: data.sessionId,
      sig: data.sig,
      token: data.token,
      scene: data.scene
    }
    setSign(signData);
    setValues({ ...values, aliDialog: false })
    // setLoading(true);
    const res = await accountLogin(signData, values, setValues);
    if (res) {
      setSubmitOAuth2(true);
    } else {
      setLoading(false);
    };
  }

  const handleChangeOAuth2 = (login: boolean) => {
    setSubmitOAuth2(false);
    setLoading(false);
    if (login) {
      let redirectUrl = getQueryString("redirectUrl");
      if (redirectUrl) redirectUrl = decodeURIComponent(redirectUrl).split(window.location.origin)[1];
      Router.replace(redirectUrl || PATH_PREFIX + '/');
    } else {
      setValues({...values, err: '登录失败'})
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div className={classes.title}>登录KeyPool</div>
        <CountryInput
          onSelect={handleCountry}
          defaultCountry={values.country}
          onPhone={handlePhoneChange}
          defaultPhone={''}
          label={'请输入手机号'}
          emptyErrorText={'请选择联系方式'}
          longErrorText={'输入的信息过长，请检查后重新输入'}
          enterErrorText={'手机号码输入有误，请重新输入'}
          language={/^[a-zA-Z]+$/.test('请输入手机号') ? 'en' : 'zh'}
          showErrorText={values.errPhoneText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          hot={false}
        />
        <div className={classes.pwTop}><PWInput onChange={handlePWChange} onFocus={handleFocus} onBlur={handleBlur} errorText={values.errPWText} hot={false}/></div>
        {values.err && values.err.length > 0 ?
          <div className={classes.pwTop}>
            <ErrorInput des={values.err} callback={handleError} />
          </div> : null
        }
        <div className={classes.loginTop}>
          <Button disabled={loading} className={clsx(classes.login)} fullWidth onClick={handleLogin} color={'primary'} variant={"contained"}>
            <Typography style={{ position: 'absolute' }}>登录</Typography>
            {loading &&
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute' }}>
                <CircularProgress size={28} />
              </div>
            }
          </Button>
        </div>
      </div>
      <div className={clsx(classes.bottom, values.focus && classes.bottomBlur)}>
        <div className={classes.bottomContent} onClick={handleForget}>
          <div>忘记密码？</div>
          <div className={classes.find}>找回密码</div>
        </div>
        <div className={classes.bottomContent} onClick={handleRegister}>
          <div>没有账号？</div>
          <div className={classes.find}>立即注册</div>
        </div>
      </div>
      <AliSlider open={values.aliDialog} render={sliderRender} onClose={handleClose} callback={handleSign} label={'人机验证滑块'} successText={'验证通过'} />
      <OAuth2 submit={submitOAuth2} onChange={handleChangeOAuth2} />
    </div>
  )
}
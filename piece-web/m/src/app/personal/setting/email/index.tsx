import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@/components/theme';
import { grey } from '@material-ui/core/colors';
import EmailTF from '@/components/text-field/email-text-field';
import CodeInput from '@/components/text-field/code-text-field';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useRouter } from 'next/router';
import { accountCode, accountPost } from '../request';
import ErrorInput from '@/components/err';
import Typography from '@material-ui/core/Typography';
import MuiAlert from '@material-ui/lab/Alert';

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
  grey: {
    color: grey[400]
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
  toast: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%'
  }
}))

export default () => {
  const classes = useStyles({});
  const router = useRouter();
  const { query: { requestId, bind = 'false' } } = router;
  let bindAccount = false;
  //@ts-ignore
  if (bind) bindAccount = JSON.parse(bind);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [values, setValues] = React.useState({
    email: '',
    code: '',
    errPhoneText: '',
    errCodeText: '',
    check: false,
  })
  const handleAccount = (e: any, res: boolean) => {
    if (!res) {
      setValues({ ...values, email: '' });
      return;
    }
    setValues({ ...values, email: e, errPhoneText: '' })
  };
  const handleCodeChange = (e: any) => setValues({ ...values, code: e, errCodeText: '' });
  const handleError = () => setError('');
  const handleChange = async () => {
    setError('');
    setLoading(false);
    if (!values.email) {
      setValues({ ...values, errPhoneText: '请输入邮箱' });
      return;
    }
    if (!values.code) {
      setValues({ ...values, errCodeText: '请输入验证码' });
      return;
    }
    const res = await accountPost({ phoneType: false, bind: bindAccount, mobileNo: '', email: values.email, country: '', code: values.code, requestId, setLoading, setError })
    if (res) {
      setValues({ ...values, check: true });
      setTimeout(() => {
        router.back();
      }, 2000);
    }
  };

  const codeRequest = async (fuc: any) => {
    if (!values.email) return;
    const res = await accountCode({ phoneType: false, bind: bindAccount, mobileNo: '', email: values.email, country: '', setLoading, setError });
    if (res) fuc();
  }
  return (
    <div className={classes.root}>
      <div className={classes.content}>
      {values.check ? (<MuiAlert elevation={6} variant="filled" severity="success" className={classes.toast}>邮箱修改/绑定成功</MuiAlert>) : null}
        <div className={classes.title}>修改/绑定邮箱</div>
        <div ><EmailTF label={'请输入邮箱'} fullWidth onChange={handleAccount} notEmpty={true} errorText={values.errPhoneText} /></div>
        <div className={classes.pwTop}>
          <CodeInput start={false} onClick={codeRequest} helpText={values.errCodeText} onChange={handleCodeChange} codeStyle={values.email?.length ? null : classes.grey} />
        </div>
        {
          error.length > 0 ? (
            <div className={classes.pwTop}>
              <ErrorInput des={error} callback={handleError} />
            </div>) : null
        }
        <div className={classes.loginTop}>
          <Button disabled={loading} className={clsx(classes.login)} fullWidth onClick={handleChange} color={'primary'} variant={"contained"}>
            <Typography style={{ position: 'absolute' }}>确认</Typography>
            {loading &&
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute' }}>
                <CircularProgress size={28} />
              </div>
            }
          </Button>
        </div>
      </div>
    </div>
  )
}
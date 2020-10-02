import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@/components/theme';
import { grey } from '@material-ui/core/colors';
import PWInput from '@/components/text-field/password-text-field';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import CircularProgress from '@material-ui/core/CircularProgress';
import ErrorInput from '@/components/err';
import { pwRules } from '@/components/text-field/password-text-field/code';
import { useRouter } from 'next/router';
import { postJson } from '@fay-react/lib/fetch';
import { BASE_URL } from '@/env';
import MuiAlert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';

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
  const { query: { requestId } } = router;
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [values, setValues] = React.useState({
    oldPassword: '',
    errOldText: '',
    newPassword: '',
    errNewText: '',
    check: false,
  })
  React.useEffect(() => {
    setValues({ ...values, oldPassword: '', newPassword: '' });
  }, [true])
  const handleOldPWChange = (e: any) => setValues({ ...values, oldPassword: e });
  const handleNewPWChange = (e: any) => setValues({ ...values, newPassword: e });
  const handleError = () => setError('');
  const handleChange = async () => {
    setError('');
    setLoading(false);
    if (!values.oldPassword) {
      setValues({ ...values, errOldText: '请输入密码' });
      return;
    }
    if (!values.newPassword) {
      setValues({ ...values, errNewText: '请输入密码' });
      return;
    }
    if (!pwRules(values.newPassword)) {
      setError('密码8-20位，必须包含数字、字母和字符中的两种');
      return;
    }
    setLoading(true);
    const newValue = { ...values, requestId }
    postJson({
      path: BASE_URL + '/updatePassWord',
      data: newValue
    })
      .then((res) => {
        setLoading(false);
        if (res.status === 0) {
          setValues({ ...values, check: true });
          setTimeout(() => {
            router.back();
          }, 2000);
        } else {
          setError(res.message);
        }
      })
  };

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        {values.check ? (<MuiAlert elevation={6} variant="filled" severity="success" className={classes.toast}>密码修改成功</MuiAlert>) : null}
        <div className={classes.title}>修改密码</div>
        <div >
          <PWInput label={'请输入旧密码'} onChange={handleOldPWChange} errorText={values.errOldText} hot={false}/>
        </div>
        <div className={classes.pwTop}>
          <PWInput label={'请输入新密码'} onChange={handleNewPWChange} errorText={values.errNewText} hot={false}/>
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
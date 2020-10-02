import { postJson } from '@fay-react/lib/fetch';
import { BASE_URL } from '@/env';

const accountCode = ({phoneType, bind, mobileNo, email, country, setLoading, setError}: any) => new Promise((resolve) => {
  const data = {
    businessType: phoneType ? (bind ? 'ChangeMobileNo' : 'BindMobileNo') : (bind ? 'UpdateEmail' : 'BindEmail'),
    mfaType: phoneType ? "Sms" : 'Email',
    email,
    mobileNo,
    country,
  }
  postJson({ path: BASE_URL + '/mfaSendCode', data })
    .then((resp: any) => {
      setLoading(false);
      if (resp.status === 0) {
        resolve(true);
        setError('');
      } else {
        resolve(false);
        setError(resp.message);
      }
    })
})

const accountPost = ({phoneType, bind, mobileNo, email, country, code, requestId, setLoading, setError}: any) => new Promise((resolve) => {
  const data = {
    code,
    email,
    mobileNo,
    mobilCountry: country,
    requestId
  }
  postJson({
    path: BASE_URL + (phoneType ? (bind ? '/changeMobileNo' : '/bindMobileNo') : (bind ? '/changeEmail' : '/bindEmail')),
    data
  })
    .then((res) => {
      setLoading(false);
      if (res.status === 0) {
        resolve(true);
      } else {
        resolve(false);
        setError(res.message)
      }
    })
})

export {
  accountCode,
  accountPost
}
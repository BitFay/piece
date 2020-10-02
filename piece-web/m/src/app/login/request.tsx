import { postJson } from '@fay-react/lib/fetch';
import { BASE_URL } from '@/env';
import { saveUser, removeUser } from '@fay-react/lib/user';
import {remove as removeCookie} from '@fay-react/lib/cookie';

const accountMfaAuthenticate = (sign: any, values: any, setValues: any) => new Promise((resolve) => {
  console.log(sign);
  postJson({
    path: BASE_URL + '/no-auth/login/mfaAuthenticate', data: {
      businessType: 'Login',
      mfaType: values.phone ? 'Sms' : 'Email',
      robot: sign,
      requestId: sign.requestId,
      mobile: {
        mobileNo: values.phone,
        country: values.country,
        code: ''
      },
      email: {
        email: values.email,
        code: ''
      },
      authenticator: {
        code: ''
      }
    }
  })
    .then((resp: any) => {
      if (resp.status === 0) {
        resolve(true);
        setValues({ ...values, aliDialog: false, errPhoneText: '' });
      } else {
        resolve(false);
        setValues({ ...values, aliDialog: false, errPhoneText: resp.message });
      }
    })
})
const accountLogin = (sign: any, values: any, setValues: any) => new Promise((resolve) => {
  removeUser();
  removeCookie("OAUTH2SESSION", { path: '/' });
  removeCookie("JSESSIONID", { path: '/' });
  const data = {
    email: values.email,
    mobileNo: values.phone,
    country: values.country,
    password: values.password,
    robot: {
      sessionId: sign.sessionId,
      sig: sign.sig,
      token: sign.token,
      scene: sign.scene,
    },
  };
  postJson({ path: BASE_URL + (values.phone ? '/login/mobile' : '/login/email'), data })
    .then((resp: any) => {
      if (resp.status === 0) {
        saveUser({ ...resp.userInfo, name: resp.loginAccount });
        resolve(true);
      } else {
        resolve(false);
        setValues({ ...values, aliDialog: false, err: resp.message })
      }
    })
})

export {
  accountMfaAuthenticate,
  accountLogin
}
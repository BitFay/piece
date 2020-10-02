import { getJson, postJson } from '@fay-react/lib/fetch';
import {BASE_URL} from "@/env";

const accountFind = (values: any, setValues: any) => new Promise((resolve) => {
  if (values.phone || values.email) {
    getJson({ path: BASE_URL + '/no-auth/existUserAccount', data: { account: values.phone || values.email } })
      .then((resp: any) => {
        if (resp.status === 200011) {
          setValues({ ...values, aliDialog: false });
          resolve(true);
        } else {
          resolve(false);
          setValues({ ...values, aliDialog: false, errPhoneText: '账号已存在' })
        }
      })
  }
})
const accountMfaAuthenticate = (sign: any, values: any, setValues: any) => new Promise((resolve) => {
  console.log(sign);
  postJson({ path: BASE_URL + '/no-auth/register/mfaAuthenticate', data: { robot: sign, businessType: 'Register', mfaType: 'Robot', requestId: sign.requestId } })
    .then((resp: any) => {
      if (resp.status === 0) {
        resolve(true);
      } else {
        resolve(false);
        setValues({ ...values, aliDialog: false, errPhoneText: resp.message })
      }
    })
})
const accountCode = (values: any, setValues: any) => new Promise((resolve) => {
  const data = {
    mfaType: values.phone ? 'Sms' : 'Email',
    businessType: "Register",
    mobileNo: values.phone,
    country: values.country,
    email: values.email
  }
  postJson({ path: BASE_URL + '/no-auth/register/mfaSendCode', data })
    .then((resp: any) => {
      if (resp.status === 0) {
        resolve(true);
      } else {
        resolve(false);
        setValues({ ...values, aliDialog: false, errPhoneText: resp.message })
      }
    })
})
const accountRegister = (values: any, setValues: any, sign: any) => new Promise((resolve) => {
  const data = {
    email: {
      email: values.email,
      code: values.code
    },
    mobile: {
      mobileNo: values.phone,
      country: values.country,
      code: values.code
    },
    robot: {
      sessionId: sign.sessionId,
      sig: sign.sig,
      token: sign.token,
      scene: sign.scene
    },
    requestId: sign.requestId,
    password: values.password,
    registerType: values.phone ? 'Mobile' : 'Email'
  }
  postJson({ path: BASE_URL + '/no-auth/registerUser', data })
    .then((res) => {
      if (res.status === 0) {
        resolve(true);
      } else {
        setValues({ ...values, err: res.message });
        resolve(false);
      }
    })
})

export {
  accountFind,
  accountMfaAuthenticate,
  accountCode,
  accountRegister
};
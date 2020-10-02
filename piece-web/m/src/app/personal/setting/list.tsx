import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { getJson } from '@fay-react/lib/fetch';
import { BASE_URL } from '@/env';
import { useRouter } from 'next/router';
import Promise from '@/components/promise';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      '& .MuiListItemText-primary': {
        fontSize: '0.875rem'
      },
      '& .MuiListItemText-secondary': {
        fontSize: '0.75rem',
        marginTop: theme.spacing(0.5)
      }
    },
    rightText: {
      textAlign: "right",
      '& .MuiListItemText-primary': {
        fontSize: '0.75rem',
      },
    },
    bottom: {
      borderBottom: '1px solid #E0E0E0'
    },
    empty: {

    }
  }),
);

export default function InsetList() {
  const classes = useStyles();
  const router = useRouter();
  const [auth, setAuth] = React.useState({
    dialog: false,
    index: 0,
    businessType: ''
  })
  const [values, setValues] = React.useState({
    bindEmail: false,
    bindMobile: false,
    email: '',
    mfaAuthenticator: false,
    mfaMobileAuthenticate: false,
    mobileCountry: '',
    mobileNo: '',
    securityLevel: "Low"
  });
  const [data, setData] = React.useState([
    {
      text: "手机号",
      secondaryText: "登录、修改安全设置时使用",
      rightText: "绑定",
      path: '/phone'
    }, {
      text: "邮箱",
      secondaryText: "登录、修改安全设置时使用",
      rightText: "绑定",
      path: '/email'
    }, {
      text: "登录密码",
      rightText: "修改",
      path: '/change'
    }]
  );
  React.useEffect(() => {
    userInfo();
  }, []);
  React.useEffect(() => {
    const [phone, email] = data;
    if (values.bindMobile) phone.rightText = values.mobileNo;
    if (values.bindEmail) email.rightText = values.email;
    setData([phone, email, data[2]]);
  }, [JSON.stringify(values)])
  const userInfo = async () => {
    const res = await getJson({ path: BASE_URL + '/getUserSettingInfo' });
    if (res.status === 0 && res.userSettingInfo) {
      setValues({ ...values, ...res.userSettingInfo });
      return true
    }
    return false;
  };
  const authClick = (index: number) => {
    let  businessType = '';
    if(index === 0) {
      businessType = values.bindMobile ? 'IdentifyChangeMobileNo' : 'IdentifyBindMobileNo'
    } else if(index === 1) {
      businessType = values.bindEmail ? 'IdentifyUpdateEmail' : 'IdentifyBindEmail'
    } else if(index === 2) {
      businessType = 'UpdatePassword'
    }
    setAuth({ dialog: true, index, businessType })
  };
  const handleClose = () => setAuth({dialog: false, index: 0, businessType: ''})
  const resultFuc = (e: any) => {
    setAuth({...auth, dialog: false});
    let bind = false;
    if (auth.index === 0 && values.bindMobile) {
      bind = true;
    } else if (auth.index === 1 && values.bindEmail) {
      bind = true;
    }
    router.push({
      pathname: router.pathname + data[auth.index].path,
      query: { requestId: e, bind }
    })
  }

  return (
    <>
      <List component="nav" className={classes.root}>
        {
          data.map((item, index) => {
            return (
              <ListItem key={index} button onClick={() => authClick(index)} className={index == 2 ? classes.empty : classes.bottom}>
                <ListItemText primary={item.text} secondary={item.secondaryText} />
                <ListItemText primary={item.rightText} className={classes.rightText} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" onClick={() => authClick(index)}>
                    <ArrowForwardIosIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            )
          })
        }
      </List>
      <Promise open={auth.dialog} businessType={auth.businessType} accountType={values.bindMobile} account={values.mobileNo || values.email} onClose={handleClose} result={resultFuc}/>
    </>
  );
}

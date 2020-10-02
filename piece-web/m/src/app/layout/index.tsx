/**
 * Create by fay on 4/22/20 8:33 上午
 */
import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Header from './header'
import Footer from './footer'
import Router, { useRouter } from 'next/router';
import { PATH_PREFIX } from '@/env';

const useStyles = ({ header, footer }: any) => makeStyles((_theme: Theme) =>
  createStyles({
    root: {
      // backgroundColor: theme.palette.common.white
    },
    content: {
      marginTop: header ? 40 : 0,
      marginBottom: footer ? 60 : 0
    }
  }),
)();

export default ({ children, header, footer, back, centerTxt, rightTxt, rightFuc = () => { } }: any) => {
  const classes = useStyles({ header, footer });
  const { pathname } = useRouter();
  let rightT = rightTxt;
  let rightF = rightFuc;
  if (pathname.indexOf('login/email') !== -1) {
    rightT = '手机登录';
    let after = Router.router?.asPath?.replace('/m/login/email/', '');
    rightF = () => Router.push(PATH_PREFIX + `/login/${after}`)
  } else if (pathname.indexOf('login') !== -1) {
    rightT = '邮箱登录';
    let after = Router.router?.asPath?.replace('/m/login/', '');
    rightF = () => Router.push(PATH_PREFIX + `/login/email/${after}`)
  } else if (pathname.indexOf('register/email') !== -1) {
    rightT = '手机注册';
    rightF = () => Router.push(PATH_PREFIX + '/register')
  } else if (pathname.indexOf('register') !== -1) {
    rightT = '邮箱注册';
    rightF = () => Router.push(PATH_PREFIX + '/register/email')
  }
  return (
    <div className={classes.root}>
      {header && <Header left={back} right={rightT && rightT !== ''} rightTxt={rightT} rightFuc={rightF} centerTxt={centerTxt} />}
      <div className={classes.content}>
        {children}
      </div>
      {footer && <Footer />}
    </div>
  )
}
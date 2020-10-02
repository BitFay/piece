/**
 * Create by fay on 4/22/20 2:48 上午
 */
import Layout from '@/app/layout';
import React from "react";
import PersonalContract from '@/app/personal/contract';
import Router from 'next/router';
import { PATH_PREFIX, BASE_SERVICE_URL } from '@/env';
import { getJson } from '@fay-react/lib/fetch';

export default () => {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    getJson({ path: BASE_SERVICE_URL + '/hold/total' }).then(res => {
      res.status === 0 && setShow(res.canTransfer);
    })
  }, [])

  return (
    <Layout header back centerTxt='我的合约' rightTxt={show ? '转出的算力' : ''} rightFuc={() => Router.push(PATH_PREFIX + '/personal/give')}>
      <PersonalContract />
    </Layout>
  )
}
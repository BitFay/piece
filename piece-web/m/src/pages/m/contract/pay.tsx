import Layout from '@/app/layout';
import React from "react";
import Pay from '@/app/contract/pay';

export default () => {
  return (
    <Layout header back centerTxt='合约详情'>
      <Pay />
    </Layout>
  )
}
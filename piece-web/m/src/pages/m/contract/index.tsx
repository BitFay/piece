/**
 * Create by fay on 4/22/20 2:48 上午
 */
import Layout from '@/app/layout';
import React from "react";
import Contract from '@/app/contract';

export default () => {
  return (
    <Layout header back centerTxt='合约详情'>
      <Contract/>
    </Layout>
  )
}
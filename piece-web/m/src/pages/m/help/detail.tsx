/**
 * Create by fay on 4/22/20 2:48 上午
 */
import Layout from '@/app/layout';
import React from "react";
import HelpDetail from '@/app/help/detail';

export default () => {
  return (
    <Layout header back centerTxt='详情页'>
      <HelpDetail/>
    </Layout>
  )
}
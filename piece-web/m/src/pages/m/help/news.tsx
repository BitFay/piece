/**
 * Create by fay on 4/22/20 2:48 上午
 */
import Layout from '@/app/layout';
import React from "react";
import News from '@/app/help/news/index';

export default () => {
  return (
    <Layout header back centerTxt='资讯动态'>
      <News />
    </Layout>
  )
}
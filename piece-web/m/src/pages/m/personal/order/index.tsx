/**
 * Create by fay on 4/22/20 2:48 上午
 */
import Layout from '@/app/layout';
import React from "react";
import PersonalOrder from '@/app/personal/order';

export default () => {
  return (
    <Layout header back centerTxt={'我的订单'}>
      <PersonalOrder/>
    </Layout>
  )
}
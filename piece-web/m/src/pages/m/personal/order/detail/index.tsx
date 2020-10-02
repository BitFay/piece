/**
 * Create by fay on 4/22/20 2:48 上午
 */
import Layout from '@/app/layout';
import React from "react";
import PersonalOrderDetail from '@/app/personal/order/detail';

export default () => {
  return (
    <Layout header back centerTxt={'订单详情'}>
      <PersonalOrderDetail/>
    </Layout>
  )
}
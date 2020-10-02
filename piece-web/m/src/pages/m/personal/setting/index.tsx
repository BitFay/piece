/**
 * Create by fay on 4/22/20 2:48 上午
 */
import Layout from '@/app/layout';
import React from "react";
import PersonalSetting from '@/app/personal/setting';

export default () => {

  return (
    <Layout header back centerTxt='账户设置'>
      <PersonalSetting/>
    </Layout>
  )
}
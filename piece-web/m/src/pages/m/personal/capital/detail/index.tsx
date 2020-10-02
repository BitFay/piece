import React from 'react';
import Detail from '@/app/personal/capital/detail';
import Layout from "@/app/layout";

export default () => {
  return (
    <Layout header back centerTxt={'资产详情'}>
      <Detail/>
    </Layout>
  )
}
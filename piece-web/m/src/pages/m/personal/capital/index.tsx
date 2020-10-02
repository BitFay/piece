import React from 'react';
import List from '@/app/personal/capital';
import Layout from "@/app/layout";

export default () => {
  return (
    <Layout header back centerTxt={'我的资产'}>
      <List/>
    </Layout>
  )
}
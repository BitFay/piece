import React from 'react';
import List from '@/app/personal/give';
import Layout from "@/app/layout";

export default () => {
  return (
    <Layout header back centerTxt={'转让算力'}>
      <List/>
    </Layout>
  )
}
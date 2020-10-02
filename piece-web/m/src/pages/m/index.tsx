/**
 * Create by fay on 4/22/20 2:48 上午
 */
import Layout from '@/app/layout';
import React from "react";
import Home from '@/app/home';

export default () => {
  console.log(process.env.PUBLIC_PATH);
  return (
    <Layout header footer>
      <Home/>
    </Layout>
  )
}
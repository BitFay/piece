import React from "react";
import Login from '@/app/login/login-email';
import Layout from '@/app/layout';

export default () => {
  return (
    <Layout header back>
      <Login />
    </Layout>
  )
}